

package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.entity.User;
import com.example.backend.repository.IssueRepository;
import com.example.backend.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final IssueRepository issueRepo;
    private final UserRepository userRepo;

    public CustomerController(IssueRepository issueRepo, UserRepository userRepo) {
        this.issueRepo = issueRepo;
        this.userRepo = userRepo;
    }

    // 📌 Raise Issue
    @PostMapping("/issue")
    public String raiseIssue(@RequestBody Issue issue) {
        issue.setStatus("OPEN");
        if (issue.getPriority() == null || issue.getPriority().isEmpty()) {
            issue.setPriority("MEDIUM");
        }
        issueRepo.save(issue);
        return "Issue raised successfully";
    }

    // 📌 My Issues
    @GetMapping("/issues/{email}")
    public List<Issue> myIssues(@PathVariable String email) {
        return issueRepo.findByCustomerEmail(email);
    }

    // 📌 Issue History (Resolved)
    @GetMapping("/history/{email}")
    public List<Issue> history(@PathVariable String email) {
        return issueRepo.findByCustomerEmailAndStatus(email, "RESOLVED");
    }

    @GetMapping("/overview/{email}")
    public Map<String, Long> overview(@PathVariable String email){
        long total= issueRepo.findByCustomerEmail(email).size();
        long open= issueRepo.findByCustomerEmailAndStatus(email, "OPEN").size();
        long resolved= issueRepo.findByCustomerEmailAndStatus(email, "RESOLVED").size();

        Map<String, Long> map = new HashMap<>();
        map.put("total", total);
        map.put("open", open);
        map.put("resolved", resolved);
        return map;

    }

    // 📌 Profile
    @GetMapping("/profile/{email}")
    public User profile(@PathVariable String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

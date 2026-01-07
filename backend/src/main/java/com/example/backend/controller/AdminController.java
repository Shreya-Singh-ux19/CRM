package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.entity.User;
import com.example.backend.repository.IssueRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins =  "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepo;
    private final IssueRepository issueRepo;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
    Map<String, Object> data = new HashMap<>();
    List<User> allUsers = userRepo.findAll();

    List<Map<String, Object>> employees = new ArrayList<>();
    List<Map<String, Object>> customers = new ArrayList<>();

    allUsers.stream()
        .filter(u -> "EMPLOYEE".equals(u.getRole()))
        .forEach(emp -> {
            Map<String, Object> e = new HashMap<>();
            e.put("id", emp.getId());
            e.put("username", emp.getUsername());
            e.put(
                "issuesSolved",
                issueRepo.countByAssignedEmployeeAndStatus(
                    emp.getUsername(), "RESOLVED"
                )
            );
            e.put("status", emp.getStatus());
            employees.add(e);
        });

    allUsers.stream()
        .filter(u -> "CUSTOMER".equals(u.getRole()))
        .forEach(c -> {
            Map<String, Object> cu = new HashMap<>();
            cu.put("id", c.getId());
            cu.put("username", c.getUsername());
            cu.put("status", c.getStatus());
            customers.add(cu);
        });
    
        User admin = userRepo.findAll().stream()
        .filter(u -> u.getRole() != null)
        .filter(u -> u.getRole().equalsIgnoreCase("ADMIN"))
        .findFirst()
        .orElse(null);

    if (admin != null) {
        Map<String, Object> adminData = new HashMap<>();
        adminData.put("username", admin.getUsername());
        adminData.put("email", admin.getEmail());

        data.put("admin", adminData);
    }


    long totalIssues = issueRepo.count();
    long resolved = issueRepo.findAll().stream().filter(i -> "RESOLVED".equals(i.getStatus())).count();
     

    data.put("totalCustomers", customers.size());
    data.put("totalEmployees", employees.size());
    data.put("totalIssues", totalIssues);
    data.put("resolvedIssues", resolved);
    data.put("unresolvedIssues", totalIssues - resolved);
    data.put("issues", issueRepo.findAll());
    data.put("employees", employees);
    data.put("customers", customers);

    return data; // ✅ THIS IS MANDATORY
}

    @PostMapping("/assign/{issueId}/{empName}")
    public String assign(@PathVariable long issueId, @PathVariable String empName) {
        Issue issue = issueRepo.findById(issueId).orElseThrow(() -> new RuntimeException("Issue not found"));;
        issue.setAssignedTo(empName);
        issue.setStatus("ASSIGNED");
        issueRepo.save(issue);
        return "Issue Assigned Successfully";
    }
}
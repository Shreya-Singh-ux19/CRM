package com.example.backend.controller;

import com.example.backend.entity.Issue;
import com.example.backend.entity.User;
import com.example.backend.repository.IssueRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class EmployeeController {

    private final IssueRepository issueRepo;
    private final UserRepository userRepo;

    /** DASHBOARD DATA RETURN */
    @GetMapping("/dashboard/{email}")
    public Map<String, Object> dashboard(@PathVariable String email) {
        Map<String, Object> data = new HashMap<>();

        // get user by email
        User emp = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("Employee not found"));
        
        String username = emp.getUsername();

        // Stats
        long assigned = issueRepo.countByAssignedEmployee(username);
        long completed = issueRepo.countByAssignedEmployeeAndStatus(username, "RESOLVED");
        long pending = issueRepo.countByAssignedEmployeeAndStatus(username, "IN_PROGRESS");

        data.put("assigned", assigned);
        data.put("completed", completed);
        data.put("pending", pending);
        data.put("issues", issueRepo.findByAssignedEmployee(username));

        List<String> notifications = new ArrayList<>();
        if (assigned > 0)
        notifications.add("You have " + assigned + " assigned issues");
        if (pending > 0)
        notifications.add(pending + " issues are still pending");
        if (completed > 0)
        notifications.add("You completed " + completed + " issues");
        data.put("notifications", notifications);
      
        // Employee profile
        Map<String, Object> profile = new HashMap<>();
        profile.put("name", emp.getUsername());
        profile.put("email", emp.getEmail());
        data.put("profile", profile);

        return data;
    }

    @PostMapping("/update-status/{id}/{status}")
    public String updateStatus(@PathVariable Long id, @PathVariable String status) {
    
        Issue issue = issueRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
    
        // Allow only valid transitions
        if ("IN_PROGRESS".equals(status) && "ASSIGNED".equals(issue.getStatus())) {
            issue.setStatus("IN_PROGRESS");
        }
        else if ("RESOLVED".equals(status) && "IN_PROGRESS".equals(issue.getStatus())) {
            issue.setStatus("RESOLVED");
    
            // Increment issuesSolved ONLY when resolved
            User emp = userRepo.findByUsername(issue.getAssignedEmployee())
                    .orElseThrow(() -> new RuntimeException("Employee not found"));
            
                    emp.setIssuesSolved(emp.getIssuesSolved() + 1);
            userRepo.save(emp);
        }
        else {
            throw new RuntimeException(
                "Invalid status transition from " + issue.getStatus() + " to " + status
            );
        }
    
        issueRepo.save(issue);
        return "Status Updated";
    }
    

}
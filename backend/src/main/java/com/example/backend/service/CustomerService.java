package com.example.backend.service;

import com.example.backend.entity.Issue;
import com.example.backend.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerService {

    private final IssueRepository issueRepository;

    public CustomerService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    public Map<String, Object> getOverviewData(String email) {

        List<Issue> issues = issueRepository.findByCustomerEmail(email);

        long total = issues.size();
        long open = issues.stream().filter(i -> i.getStatus().equals("OPEN")).count();
        long resolved = issues.stream().filter(i -> i.getStatus().equals("RESOLVED")).count();

        Issue latest = issues.isEmpty() ? null : issues.get(issues.size() - 1);

        Map<String, Object> response = new HashMap<>();
        response.put("totalIssues", total);
        response.put("openIssues", open);
        response.put("resolvedIssues", resolved);
        response.put("latestIssue", latest);

        return response;
    }
}

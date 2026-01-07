package com.example.backend.repository;

import com.example.backend.entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByCustomerEmail(String email);
    List<Issue> findByCustomerEmailAndStatus(String email, String status);
    List<Issue>  findByAssignedEmployee(String assignedEmployee);

    long countByAssignedEmployee(String assignedEmployee);
    long countByAssignedEmployeeAndStatus(String assignedEmployee, String status);
}

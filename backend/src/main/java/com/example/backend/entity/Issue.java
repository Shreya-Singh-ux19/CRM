package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; 
    private String priority; 
    private String deadline;

    private String customerEmail;
    private String assignedEmployee;
    
    public String getStatus(){
        return status;
    }

    public void setAssignedTo(String assignedEmployee){
        this.assignedEmployee = assignedEmployee;
    }
}


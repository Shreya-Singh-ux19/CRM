package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.Data;



@Data

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 


    private String username;
    private String email;
    private String password;
    private String role;
    private String status = "Active";
    private int issuesSolved = 0;


    

    // ✅ REQUIRED getters
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }

    public int getIssuesSolved(){
        return issuesSolved;
    }

    public void setIssuesSolved(int issuesSolved){
        this.issuesSolved = issuesSolved;
    }

    // setters omitted for brevity

    
}

package com.mariana.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mariana.portfolio.service.GitHubClient;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class GitHubController {
    private final GitHubClient gitHubClient;

    public GitHubController(GitHubClient gitHubClient) {
        this.gitHubClient = gitHubClient;
    }

    @GetMapping("/repos")
    public ResponseEntity<List<GitHubClient.Repo>> getRepos(
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) String direction
    ) {
        try {
            List<GitHubClient.Repo> repos = gitHubClient.fetchUserRepos(sort, direction);
            
            // Filtrar por lenguaje
            if (StringUtils.hasText(language)) {
                String lang = language.trim().toLowerCase(Locale.ROOT);
                repos = repos.stream()
                        .filter(r -> r.language() != null && r.language().toLowerCase(Locale.ROOT).equals(lang))
                        .collect(Collectors.toList());
            }
            
            // Filtrar por tipo
            if (StringUtils.hasText(type)) {
                String t = type.trim().toLowerCase(Locale.ROOT);
                repos = repos.stream()
                        .filter(r -> switch (t) {
                            case "fork" -> r.fork();
                            case "source" -> !r.fork();
                            case "archived" -> r.archived();
                            default -> true;
                        })
                        .collect(Collectors.toList());
            }
            
            return ResponseEntity.ok(repos);
        } catch (Exception e) {
            // Log del error (en producción usarías un logger)
            System.err.println("Error fetching repos: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/repos/{name}")
    public ResponseEntity<GitHubClient.Repo> getRepo(@PathVariable String name) {
        try {
            GitHubClient.Repo repo = gitHubClient.fetchRepo(name);
            return ResponseEntity.ok(repo);
        } catch (Exception e) {
            System.err.println("Error fetching repo " + name + ": " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}

 


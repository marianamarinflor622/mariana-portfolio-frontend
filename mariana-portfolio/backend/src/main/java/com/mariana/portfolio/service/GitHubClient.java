package com.mariana.portfolio.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Component
public class GitHubClient {
    private static final Logger logger = LoggerFactory.getLogger(GitHubClient.class);
    private final RestClient restClient;
    private final String username;

    public GitHubClient(
            @Value("${github.username:marianamarinflor622}") String username,
            @Value("${github.token:}") String token
    ) {
        this.username = username;
        RestClient.Builder builder = RestClient.builder()
                .baseUrl("https://api.github.com")
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("X-GitHub-Api-Version", "2022-11-28");
        
        if (token != null && !token.isBlank()) {
            builder = builder.defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token.trim());
        }
        
        this.restClient = builder.build();
    }

    public List<Repo> fetchUserRepos(String sort, String direction) {
        String s = (sort == null || sort.isBlank()) ? "updated" : sort;
        String d = (direction == null || direction.isBlank()) ? "desc" : direction;
        
        try {
            Repo[] repos = restClient.get()
                    .uri("/users/{user}/repos?per_page=100&sort=" + s + "&direction=" + d, username)
                    .retrieve()
                    .body(Repo[].class);
            return Arrays.asList(Objects.requireNonNullElse(repos, new Repo[0]));
        } catch (Exception e) {
            logger.error("Error fetching user repos for user {}: {}", username, e.getMessage(), e);
            return List.of(); // Retorna lista vacía en caso de error
        }
    }

    public Repo fetchRepo(String name) {
        try {
            return restClient.get()
                    .uri("/repos/{user}/{repo}", username, name)
                    .retrieve()
                    .body(Repo.class);
        } catch (Exception e) {
            logger.error("Error fetching repo {} for user {}: {}", name, username, e.getMessage(), e);
            throw new RuntimeException("Repository not found: " + name, e);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Repo(
            String name,
            @JsonProperty("full_name") String fullName,
            String description,
            @JsonProperty("html_url") String htmlUrl,
            String language,
            List<String> topics,
            boolean fork,
            boolean archived,
            @JsonProperty("created_at") OffsetDateTime createdAt,
            @JsonProperty("updated_at") OffsetDateTime updatedAt,
            @JsonProperty("pushed_at") OffsetDateTime pushedAt,
            @JsonProperty("stargazers_count") int stargazersCount,
            @JsonProperty("watchers_count") int watchersCount,
            @JsonProperty("forks_count") int forksCount,
            @JsonProperty("size") int size
    ) {}
}



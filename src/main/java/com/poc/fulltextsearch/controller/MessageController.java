package com.poc.fulltextsearch.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poc.fulltextsearch.data.MessageData;
import com.poc.fulltextsearch.service.MessageService;

@RestController
public class MessageController {

    MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping(path = "/save", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveData(@RequestBody MessageData messageData) {
        messageService.save(messageData);
    }

    @GetMapping(path = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<MessageData> fullTextSearch(@RequestParam String searchString) {
        return messageService.searchMessages(searchString);
    }

    @GetMapping(path = "/searchids", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<String> fullTextSearchId(@RequestParam String searchString) {
        return messageService.searchMessageIds(searchString);
    }

}

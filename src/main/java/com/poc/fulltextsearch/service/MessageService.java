package com.poc.fulltextsearch.service;

import java.util.List;
import java.util.stream.Collectors;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import com.poc.fulltextsearch.data.MessageData;
import com.poc.fulltextsearch.repository.MessageRepository;

@Service
public class MessageService {

    MessageRepository messageRepository;

    MongoTemplate mongoTemplate;

    public MessageService(MessageRepository messageRepository, MongoTemplate mongoTemplate) {
        this.messageRepository = messageRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public MessageData save(MessageData messageData) {
        return messageRepository.save(new MessageData(messageData.messageId(), messageData.sentBody(),
                messageData.reponseBody(), messageData.sentHeader(), messageData.responseHeader()));
    }

    public List<MessageData> searchMessages(String searchQuery) {
        AggregationOperation searchOperation = context -> new Document("$search",
                new Document("index", "fulltext")
                        .append("text", new Document("query", searchQuery)
                                .append("path", new Document("wildcard", "*"))));

        AggregationResults<MessageData> results = mongoTemplate.aggregate(Aggregation.newAggregation(searchOperation),
                "message", MessageData.class);

        return results.getMappedResults();
    }

    public List<String> searchMessageIds(String searchQuery) {
        AggregationOperation searchOperation = context -> new Document("$search",
                new Document("index", "fulltext")
                        .append("text", new Document("query", searchQuery)
                                .append("path", new Document("wildcard", "*"))));

        AggregationOperation projectOperation = context -> new Document("$project", new Document("_id", 1));

        AggregationResults<Document> results = mongoTemplate.aggregate(
                Aggregation.newAggregation(searchOperation, projectOperation),
                "message",
                Document.class);

        return results.getMappedResults().stream()
                .map(document -> document.get("_id", String.class))
                .collect(Collectors.toList());
    }

}

package com.poc.fulltextsearch.data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "message")
public record MessageData(
        @Id String messageId,
        Object sentBody,
        Object reponseBody,
        Object sentHeader,
        Object responseHeader) {
}

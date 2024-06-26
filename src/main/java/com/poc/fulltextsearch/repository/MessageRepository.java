package com.poc.fulltextsearch.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.poc.fulltextsearch.data.MessageData;

@Repository
public interface MessageRepository extends CrudRepository<MessageData, String> {

}

package com.hackfmi.sport.squad.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by inakov on 14-11-8.
 */
@Repository
public class GameRepositoryImpl implements GameRepository {
    @Autowired
    MongoTemplate mongoTemplate;
}

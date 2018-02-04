import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import {getAllMessages} from '../db/chat';

const s3Router = express.Router();
export default s3Router;

import aws from 'aws-sdk';
aws.config.update({region:'eu-west-2'});

s3Router.get("/*", require('react-s3-uploader/s3router')({
    bucket: "lerkendalinvitational",
    signatureVersion: 'v4',
    headers: {'Access-Control-Allow-Origin': '*'},
    uniquePrefix: true
}));

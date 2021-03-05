'use strict';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import app from './app';

export const handler = (event: APIGatewayProxyEvent, context: Context) => proxy(createServer(app), event, context);

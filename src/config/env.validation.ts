import * as Joi from 'joi';

export const envSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development')
        .lowercase()
        .required(),

    PORT: Joi.number()
        .default(3000),

    MONGO_URI: Joi.string()
        .required()
        .messages({ 'any.required': '"MONGO_URI" è obbligatoria per connettersi al database' }),
        
    MONGO_DB: Joi.string()
        .required()
        .messages({ 'any.required': '"MONGO_DB" è obbligatorio per connettersi al database' }),

    JWT_SECRET: Joi.string()
        .required(),

    JWT_EXPIRES_IN: Joi.string()
        .default('15m'),
}).unknown(true); 
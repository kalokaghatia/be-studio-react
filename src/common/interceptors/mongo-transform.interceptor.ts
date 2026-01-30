import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MongoTransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => this.transformResponse(data))
        );
    }

    private transformResponse(data: any): any {
        if (!data) return data;

        if (Array.isArray(data)) {
            return data.map(item => this.transformObject(item));
        }

        if (typeof data === 'object') {
            return this.transformObject(data);
        }

        return data;
    }

    private transformObject(obj: any): any {
        if (
            !obj ||
            typeof obj !== 'object' ||
            obj instanceof Date ||
            obj instanceof RegExp ||
            typeof obj === 'string' ||
            typeof obj === 'number' ||
            typeof obj === 'boolean'
        ) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => this.transformObject(item));
        }

        if (typeof obj.toJSON === 'function') {
            obj = obj.toJSON();
        }

        const transformed: any = {};

        if (obj._id) {
            transformed.id = obj._id.toString();
        }

        Object.keys(obj).forEach(key => {
            // Escludi campi sensibili
            if (key === '_id' || key === '__v' || key === 'password' || key === 'refreshToken') {
                return;
            }

            const value = obj[key];

            if (value && typeof value === 'object' && !(value instanceof Date)) {
                transformed[key] = this.transformObject(value);
            } else {
                transformed[key] = value;
            }
        });

        return transformed;
    }
}
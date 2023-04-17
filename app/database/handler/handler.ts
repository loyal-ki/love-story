/* eslint-disable no-restricted-syntax */
import {COMBINE_SCHEMA} from '@database/combine_schema';
import manager from '@database/manager';

interface ComparedFields {
    id?: number;
    searched_item_id?: number;
    mangaId?: number;
}

function compareFields(first: ComparedFields, second: ComparedFields) {
    const isRefEq = first === second;
    const isIdEq =
        first.id !== undefined && second.id !== undefined ? first.id === second.id : false;
    const isSearchRecentIdEq =
        first.searched_item_id !== undefined && second.searched_item_id !== undefined
            ? first.searched_item_id === second.searched_item_id
            : false;
    const isReadingStatusEq =
        first.mangaId !== undefined && second.mangaId !== undefined
            ? first.mangaId === second.mangaId
            : false;

    return isRefEq || isIdEq || isSearchRecentIdEq || isReadingStatusEq;
}

/* //////////////////////////////////////////////////////////////
                    DATABASE HANDLER
  ////////////////////////////////////////////////////////////// */
class DatabaseHandler {
    /**
     * convertToItem<T>(item: T & Realm.Object, schema: string): T: A private method that takes
     * an item of type T & Realm.Object and a schema name as input params. It extracts the properties from
     * the item that correspond to the schema and returns them as a new object of type T.
     */
    private convertToItem<T extends {[key: string]: any}>(
        item: T & Realm.Object,
        schema: string
    ): T {
        const object: any = {};
        const properties = Object.getOwnPropertyNames(COMBINE_SCHEMA[schema].properties);
        for (const property of properties) {
            object[property] = item[property];
        }
        return object;
    }

    /**
     * getCopyObjectById<T>(schema: string, id: number): Promise<T | undefined>: An
     * asynchronous method that takes two arguments, schema of type string and id of type
     * number as input params. It retrieves a copy of an object from the database based on
     * the given schema and id. If no object is found with the given id it returns undefined.
     */
    async getCopyObjectById<T extends {[key: string]: any}>(
        schema: string,
        id: number
    ): Promise<T | undefined> {
        const realm = await manager.databaseConnection();
        const result = realm.objectForPrimaryKey<T>(schema, id);
        if (!result) {
            return undefined;
        }
        return this.convertToItem<T>(result, schema);
    }

    /**
     * getObjectById<T>(schema: string, id: number): Promise<T | undefined | null>: An asynchronous
     * method that takes two arguments, schema of type string and id of type number as input params.
     * It retrieves an object from the database based on the given schema and id. If no object is
     * found with the given id it returns undefined.
     */
    async getObjectById<T>(schema: string, id: number): Promise<T | undefined | null> {
        const realm = await manager.databaseConnection();
        const result = realm.objectForPrimaryKey<T>(schema, id);
        return result;
    }

    async getObjectsById<T extends {id: number}>(schema: string, ids: number[]): Promise<T[]> {
        const realm = await manager.databaseConnection();
        const objs = realm.objects<T>(schema).snapshot();
        const result: T[] = [];
        for (const obj of objs) {
            if (ids.includes(obj.id)) {
                result.push(obj);
            }
        }
        return result;
    }

    /**
     * getObjectsById<T extends {id: number}>(schema: string, ids: number[]): Promise<T[]>: An asynchronous
     * method that takes two arguments, schema of type string and ids of type number[]. It retrieves objects
     * from the database based on the given schema and ids.
     */
    async getAllObjects<T>(schema: string): Promise<T[]> {
        const realm = await manager.databaseConnection();
        const objects = realm.objects<T>(schema).snapshot();
        return Array.from(objects);
    }

    /**
     * getAllObjectsWithOmit<T>(schema: string, omits: string[]): Promise<T[]>: An asynchronous
     * method that takes two arguments, schema of type string and omits of type string[]. It
     * retrieves all objects from the database based on the given schema, omitting certain properties
     * as specified by the omits array.
     */
    async getAllObjectsWithOmit<T>(schema: string, omits: string[]): Promise<T[]> {
        const realm = await manager.databaseConnection();
        const objects = realm.objects<T>(schema).snapshot();
        const result: T[] = [];
        for (const obj of objects) {
            const newObj = {};
            for (const key in obj) {
                if (!omits.includes(key)) {
                    (newObj as any)[key] = (obj as any)[key];
                }
            }
            result.push(newObj as T);
        }
        return result;
    }

    /**
     * getAllObjectsWithQuery<T>(schema: string, query: string): Promise<T[]>: An asynchronous
     * method that takes two arguments, schema of type string and query of type string. It retrieves
     * objects from the database based on the given schema and a search query.
     */
    async getAllObjectsWithQuery<T>(schema: string, query: string): Promise<T[]> {
        const realm = await manager.databaseConnection();
        const objects = realm.objects<T>(schema).filtered(query).snapshot();
        return Array.from(objects);
    }

    /**
     * createObject<T>(schema: string, obj: T): An asynchronous method that takes two arguments,
     * schema of type string and obj of type T. It creates an object in the database based on the
     * given schema and object.
     */
    async createObject<T>(schema: string, obj: T) {
        const realm = await manager.databaseConnection();
        realm.write(() => {
            realm.create(schema, obj as T & Realm.Object, Realm.UpdateMode.Modified);
        });
    }

    /**
     * createObjects<T>(schema: string, objects: T[]): An asynchronous method that takes two arguments,
     * schema of type string and objects of type T[]. It creates objects in the database based on the
     * given schema and objects.
     */
    async createObjects<T>(schema: string, objects: T[]) {
        const realm = await manager.databaseConnection();
        realm.write(() => {
            for (const obj of objects) {
                realm.create(schema, obj as T & Realm.Object, Realm.UpdateMode.Modified);
            }
        });
    }

    /**
     * updateFields<T>(schema: string, id: number, fields: string[], values: any[]): An asynchronous
     * method that takes four arguments, schema of type string, id of type number, fields of type
     * string[], and values of type any[]. It updates specific fields of an object in the database
     * based on the given schema and id.
     */

    async updateFields<T>(schema: string, id: number, fields: string[], values: any[]) {
        const realm = await manager.databaseConnection();
        const obj = realm.objectForPrimaryKey<T>(schema, id);
        realm.write(() => {
            if (obj) {
                fields.forEach((field, index) => {
                    (obj as any)[field] = values[index];
                });
            }
        });
    }

    /**
     * addElementToFields<T extends ComparedFields>
     * (schema: string, id: number, fields: string[], values: any[]): An asynchronous method that takes
     * four arguments, schema of type string, id of type number, fields of type string[], and values of
     * type any[]. It adds elements to specific fields of an object in the database based on the
     * given schema and id.
     */
    async addElementToFields<T extends ComparedFields>(
        schema: string,
        id: number,
        fields: string[],
        values: any[]
    ) {
        const realm = await manager.databaseConnection();
        const obj = realm.objectForPrimaryKey<T>(schema, id);
        if (!obj) {
            return;
        }
        realm.write(() => {
            if (obj) {
                fields.forEach((fieldName, index) => {
                    const value = values[index];
                    const field = (obj as any)[fieldName];
                    const findIndex = field.findIndex((el: T) => compareFields(el, value));
                    if (findIndex === -1) {
                        field.push(value);
                    } else {
                        field[findIndex] = value;
                    }
                });
            }
        });
    }

    /**
     * removeElementFromFields<T extends ComparedFields>
     * (schema: string, id: number, fields: string[], values: any[]): An asynchronous method
     * that takes four arguments, schema of type string, id of type number, fields of type string[],
     * and values of type any[]. It removes elements from specific fields of an object in the database
     * based on the given schema and id.
     */
    async removeElementFromFields<T extends ComparedFields>(
        schema: string,
        id: number,
        fields: string[],
        values: any[]
    ) {
        const realm = await manager.databaseConnection();
        const obj = realm.objectForPrimaryKey<T>(schema, id);
        if (!obj) {
            return;
        }
        realm.write(() => {
            if (obj) {
                fields.forEach((fieldName, index) => {
                    const value = values[index];
                    const field = (obj as any)[fieldName];
                    const findIndex = field.findIndex((el: T) => compareFields(el, value));
                    if (findIndex !== -1) {
                        field.splice(findIndex, 1);
                    }
                });
            }
        });
    }

    /**
     * updateDictionaries(schema: string, id: number, dictionaries: string[], values: {[key: string]: {}}[]):
     * An asynchronous method that takes four arguments, schema of type string, id of type number,
     * dictionaries of type string[], and values of type {[key: string]: {}}[]. It updates dictionary
     * fields of an object in the database based on the given schema, id and related dictionaries.
     */

    async updateDictionaries(
        schema: string,
        id: number,
        dictionaries: string[],
        // eslint-disable-next-line @typescript-eslint/ban-types
        values: {[key: string]: {}}[]
    ) {
        const realm = await manager.databaseConnection();
        realm.write(() => {
            const obj: {[key: string]: unknown} | undefined | null = realm.objectForPrimaryKey(
                schema,
                id
            );
            if (obj) {
                dictionaries.forEach((name, index) => {
                    const field = obj[name] as Realm.DictionaryBase;
                    if (field.set) {
                        field.set(values[index]);
                    }
                });
            }
        });
    }

    async deleteAll() {
        const realm = await manager.databaseConnection();
        realm.write(() => {
            realm.deleteAll();
        });
    }
}

export default new DatabaseHandler();

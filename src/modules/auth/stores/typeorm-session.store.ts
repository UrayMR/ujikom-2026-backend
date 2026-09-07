import { DataSource, Repository } from 'typeorm';
import session from 'express-session';
import { Session } from '../entities/session.entity.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmSessionStore extends session.Store {
  private readonly repository: Repository<Session>;

  constructor(dataSource: DataSource) {
    super();

    this.repository = dataSource.getRepository(Session);
  }

  get(
    sid: string,
    callback: (err: any, session?: session.SessionData | null) => void,
  ): void {
    this.repository
      .findOne({
        where: { id: sid },
      })
      .then((record) => {
        if (!record) {
          return callback(null, null);
        }

        if (record.expiresAt <= new Date()) {
          return this.destroy(sid, (error) => {
            if (error) {
              return callback(error);
            }

            callback(null, null);
          });
        }

        callback(null, JSON.parse(record.data));
      })
      .catch((error) => callback(error));
  }

  set(
    sid: string,
    sessionData: session.SessionData,
    callback: (err?: any) => void,
  ): void {
    const record = this.repository.create({
      id: sid,
      data: JSON.stringify(sessionData),
      expiresAt: sessionData.cookie.expires
        ? new Date(sessionData.cookie.expires)
        : new Date(Date.now() + (sessionData.cookie.maxAge ?? 0)),
    });

    this.repository
      .save(record)
      .then(() => callback())
      .catch((error) => callback(error));
  }

  destroy(sid: string, callback: (err?: any) => void): void {
    this.repository
      .delete(sid)
      .then(() => callback())
      .catch((error) => callback(error));
  }

  touch(
    sid: string,
    sessionData: session.SessionData,
    callback: (err?: any) => void,
  ): void {
    const expiresAt = sessionData.cookie.expires
      ? new Date(sessionData.cookie.expires)
      : new Date(Date.now() + (sessionData.cookie.maxAge ?? 0));

    this.repository
      .update(
        { id: sid },
        {
          expiresAt,
        },
      )
      .then(() => callback())
      .catch((error) => callback(error));
  }
}

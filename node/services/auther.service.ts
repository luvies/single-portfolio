import { Connection } from 'mysql';
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { sqlPrimer } from './base.service';

export class AutherService {
  private loginTokenKey = 'login_token';
  private cookieTokenName = 'token';
  private sqlLoginTokenGet = sqlPrimer(`
SELECT 'value'
FROM 'Config'
WHERE 'Key' = ?
`);
  private sqlLoginTokenSet = sqlPrimer(`
INSERT INTO 'Config' ('Key', 'Value') VALUES (?, ?)
  ON DUPLICATE KEY UPDATE 'Value' = ?;
`);

  constructor(
    private dbConn: Connection
  ) { }

  private get currentPassword() {
    return process.env.PASSWORD || 'admin'; // return ENV var or default
  }

  public isLoggedIn(req: Request, cb: (loggedIn: boolean) => void) {
    if (req.cookies[this.cookieTokenName]) {
      this.dbConn
        .query(
          this.sqlLoginTokenGet,
          [this.loginTokenKey],
          (sqlErr, results) => {
            if (sqlErr) throw sqlErr;
            else cb(
              results.length > 0 && results[0].value ?
                req.cookies[this.cookieTokenName] === results[0].value :
                false
            );
          }
        );
    } else cb(false);
  }

  public doLogin(req: Request, res: Response, cb: (success: boolean) => void) {
    if (req.body.password === this.currentPassword) {
      randomBytes(256, (rngErr, buf) => {
        if (rngErr) throw rngErr;
        else {
          const token = buf.toString('base64');
          this.dbConn
            .query(
              this.sqlLoginTokenSet,
              [this.loginTokenKey, token, token],
              (sqlErr, results) => {
                if (sqlErr) throw sqlErr;
                else {
                  res.cookie(this.cookieTokenName, token);
                  cb(true);
                }
              }
            );
        }
      });
    } else cb(false);
  }
}

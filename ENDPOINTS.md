# Endpoints

> "Easy-to-read" endpoint documentation

## Users

| Endpoint | Method | Path | Anonymous | Authenticated | Owner |
|---|---|---|---|---|---|
| create | POST | / | yes | yes | yes |
| patchOrCreate | PATCH | / | disabled | disabled | disabled |
| replaceOrCreate | PUT | / | disabled | disabled | disabled |
| find | GET | / | disabled | disabled | disabled |
| patchAttributes | PATCH | /:id | no | no | yes |
| findById | GET | /:id | no | no | yes |
| replaceById | PUT | /:id | no | no | yes |
| deleteById | DELETE | /:id | no | no | yes |
| exists | GET | /:id/exists | no | no | yes |
| replaceById | POST | /:id/replace | no | no | yes |
| createChangeStream | GET | /:id/change-stream | no | no | yes |
| createChangeStream | POST | /:id/change-stream | no | no | yes |
| count | GET | /count | disabled | disabled | disabled |
| findOne | GET | /findOne | disabled | disabled | disabled |
| replaceOrCreate | PUT | /replaceOrCreate | disabled | disabled | disabled |
| updateAll | POST | /update | disabled | disabled | disabled |
| upsertWithWhere | POST | /upsertWithWhere | disabled | disabled | disabled |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_accessTokens | GET | /:id/accessTokens | no | no | yes |
| prototype.\_\_create\_\_accessTokens | POST | /:id/accessTokens | no | no | yes |
| prototype.\_\_delete\_\_accessTokens | DELETE | /:id/accessTokens | no | no | yes |
| prototype.\_\_findById\_\_accessTokens | GET | /:id/accessTokens/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_accessTokens | DELETE | /:id/accessTokens/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_accessTokens | PUT | /:id/accessTokens/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_accessTokens | GET | /:id/accessTokens/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_interactions | GET | /:id/interactions | no | no | yes |
| prototype.\_\_create\_\_interactions | POST | /:id/interactions | no | no | yes |
| prototype.\_\_delete\_\_interactions | DELETE | /:id/interactions | no | no | yes |
| prototype.\_\_findById\_\_interactions | GET | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_interactions | DELETE | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_interactions | PUT | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_interactions | GET | /:id/interactions/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_jobs | GET | /:id/jobs | no | no | yes |
| prototype.\_\_create\_\_jobs | POST | /:id/jobs | no | no | yes |
| prototype.\_\_delete\_\_jobs | DELETE | /:id/jobs | no | no | yes |
| prototype.\_\_findById\_\_jobs | GET | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_jobs | DELETE | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_jobs | PUT | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_jobs | GET | /:id/jobs/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_offers | GET | /:id/offers | no | no | yes |
| prototype.\_\_create\_\_offers | POST | /:id/offers | no | no | yes |
| prototype.\_\_delete\_\_offers | DELETE | /:id/offers | no | no | yes |
| prototype.\_\_findById\_\_offers | GET | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_offers | DELETE | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_offers | PUT | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_offers | GET | /:id/offers/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_searches | GET | /:id/searches | no | no | yes |
| prototype.\_\_create\_\_searches | POST | /:id/searches | no | no | yes |
| prototype.\_\_delete\_\_searches | DELETE | /:id/searches | no | no | yes |
| prototype.\_\_findById\_\_searches | GET | /:id/searches/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_searches | DELETE | /:id/searches/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_searches | PUT | /:id/searches/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_searches | GET | /:id/searches/count | no | no | yes |

## Interactions

| Endpoint | Method | Path | Anonymous | Authenticated | Owner |
|---|---|---|---|---|---|
| create | POST | / | no | yes | yes |
| patchOrCreate | PATCH | / | disabled | disabled | disabled |
| replaceOrCreate | PUT | / | disabled | disabled | disabled |
| find | GET | / | disabled | disabled | disabled |
| patchAttributes | PATCH | /:id | no | no | yes |
| findById | GET | /:id | no | no | yes |
| replaceById | PUT | /:id | no | no | yes |
| deleteById | DELETE | /:id | no | no | yes |
| exists | GET | /:id/exists | no | no | yes |
| replaceById | POST | /:id/replace | no | no | yes |
| createChangeStream | GET | /:id/change-stream | no | no | yes |
| createChangeStream | POST | /:id/change-stream | no | no | yes |
| count | GET | /count | disabled | disabled | disabled |
| findOne | GET | /findOne | disabled | disabled | disabled |
| replaceOrCreate | PUT | /replaceOrCreate | disabled | disabled | disabled |
| updateAll | POST | /update | disabled | disabled | disabled |
| upsertWithWhere | POST | /upsertWithWhere | disabled | disabled | disabled |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_job | GET | /:id/job | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_user | GET | /:id/user | no | no | yes |

## Jobs

| Endpoint | Method | Path | Anonymous | Authenticated | Owner |
|---|---|---|---|---|---|
| create | POST | / | no | yes | yes |
| patchOrCreate | PATCH | / | disabled | disabled | disabled |
| replaceOrCreate | PUT | / | disabled | disabled | disabled |
| find | GET | / | disabled | disabled | disabled |
| patchAttributes | PATCH | /:id | no | no | yes |
| findById | GET | /:id | no | no | yes |
| replaceById | PUT | /:id | no | no | yes |
| deleteById | DELETE | /:id | no | no | yes |
| exists | GET | /:id/exists | no | no | yes |
| replaceById | POST | /:id/replace | no | no | yes |
| createChangeStream | GET | /:id/change-stream | no | no | yes |
| createChangeStream | POST | /:id/change-stream | no | no | yes |
| count | GET | /count | disabled | disabled | disabled |
| findOne | GET | /findOne | disabled | disabled | disabled |
| replaceOrCreate | PUT | /replaceOrCreate | disabled | disabled | disabled |
| updateAll | POST | /update | disabled | disabled | disabled |
| upsertWithWhere | POST | /upsertWithWhere | disabled | disabled | disabled |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_interactions | GET | /:id/interactions | no | no | yes |
| prototype.\_\_create\_\_interactions | POST | /:id/interactions | no | no | yes |
| prototype.\_\_delete\_\_interactions | DELETE | /:id/interactions | no | no | yes |
| prototype.\_\_findById\_\_interactions | GET | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_interactions | DELETE | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_interactions | PUT | /:id/interactions/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_interactions | GET | /:id/interactions/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_offers | GET | /:id/offers | no | no | yes |
| prototype.\_\_create\_\_offers | POST | /:id/offers | no | no | yes |
| prototype.\_\_delete\_\_offers | DELETE | /:id/offers | no | no | yes |
| prototype.\_\_findById\_\_offers | GET | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_offers | DELETE | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_offers | PUT | /:id/offers/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_offers | GET | /:id/offers/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_search | GET | /:id/search | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_user | GET | /:id/user | no | no | yes |

## Searches

| Endpoint | Method | Path | Anonymous | Authenticated | Owner |
|---|---|---|---|---|---|
| create | POST | / | no | yes | yes |
| patchOrCreate | PATCH | / | disabled | disabled | disabled |
| replaceOrCreate | PUT | / | disabled | disabled | disabled |
| find | GET | / | disabled | disabled | disabled |
| patchAttributes | PATCH | /:id | no | no | yes |
| findById | GET | /:id | no | no | yes |
| replaceById | PUT | /:id | no | no | yes |
| deleteById | DELETE | /:id | no | no | yes |
| exists | GET | /:id/exists | no | no | yes |
| replaceById | POST | /:id/replace | no | no | yes |
| createChangeStream | GET | /:id/change-stream | no | no | yes |
| createChangeStream | POST | /:id/change-stream | no | no | yes |
| count | GET | /count | disabled | disabled | disabled |
| findOne | GET | /findOne | disabled | disabled | disabled |
| replaceOrCreate | PUT | /replaceOrCreate | disabled | disabled | disabled |
| updateAll | POST | /update | disabled | disabled | disabled |
| upsertWithWhere | POST | /upsertWithWhere | disabled | disabled | disabled |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_jobs | GET | /:id/jobs | no | no | yes |
| prototype.\_\_create\_\_jobs | POST | /:id/jobs | no | no | yes |
| prototype.\_\_delete\_\_jobs | DELETE | /:id/jobs | no | no | yes |
| prototype.\_\_findById\_\_jobs | GET | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_destroyById\_\_jobs | DELETE | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_updateById\_\_jobs | PUT | /:id/jobs/:fk | disabled | disabled | disabled |
| prototype.\_\_count\_\_jobs | GET | /:id/jobs/count | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_user | GET | /:id/user | no | no | yes |

## Offers

| Endpoint | Method | Path | Anonymous | Authenticated | Owner |
|---|---|---|---|---|---|
| create | POST | / | no | yes | yes |
| patchOrCreate | PATCH | / | disabled | disabled | disabled |
| replaceOrCreate | PUT | / | disabled | disabled | disabled |
| find | GET | / | disabled | disabled | disabled |
| patchAttributes | PATCH | /:id | no | no | yes |
| findById | GET | /:id | no | no | yes |
| replaceById | PUT | /:id | no | no | yes |
| deleteById | DELETE | /:id | no | no | yes |
| exists | GET | /:id/exists | no | no | yes |
| replaceById | POST | /:id/replace | no | no | yes |
| createChangeStream | GET | /:id/change-stream | no | no | yes |
| createChangeStream | POST | /:id/change-stream | no | no | yes |
| count | GET | /count | disabled | disabled | disabled |
| findOne | GET | /findOne | disabled | disabled | disabled |
| replaceOrCreate | PUT | /replaceOrCreate | disabled | disabled | disabled |
| updateAll | POST | /update | disabled | disabled | disabled |
| upsertWithWhere | POST | /upsertWithWhere | disabled | disabled | disabled |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_job | GET | /:id/job | no | no | yes |
|  |  |  |  |  |  |
| prototype.\_\_get\_\_user | GET | /:id/user | no | no | yes |

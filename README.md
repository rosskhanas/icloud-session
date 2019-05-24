# icloud-session

[![Greenkeeper badge](https://badges.greenkeeper.io/rtkhanas/icloud-session.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/rosskhanas/icloud-session.svg?branch=master)](https://travis-ci.org/rosskhanas/icloud-session)
[![npm package](https://badge.fury.io/js/icloud-session.svg)](https://www.npmjs.org/package/icloud-session)
[![Dependency Status](https://david-dm.org/rtkhanas/icloud-session.svg)](https://david-dm.org/rtkhanas/icloud-session)
[![devDependency Status](https://david-dm.org/rtkhanas/icloud-session/dev-status.svg)](https://david-dm.org/rtkhanas/icloud-session#info=devDependencies)

An iCloud session management API.

### Installation

```
yarn add icloud-session
```

### API

#### default.login

prop          | type        | required | description
--------------|-------------|----------|-------------
`credentials` | `object`    | true     | An object with an 'apple_id' and a 'password' keys (an email and a password)
`callback`    | `func`      | false    | 

#### default.validateSession

prop       | type        | required | description
-----------|-------------|----------|-------------
`session`  | `object`    | true     | An object received from this library
`callback` | `func`      | false    | 

#### requestICloudData

prop       | type        | required | description
-----------|-------------|----------|-------------
`session`  | `object`    | true     | An object received from a `icloud-session` library
`url`      | `string`    | true     | 
`data`     | `string`    | false    | Request body. (Use `JSON.stringify` for json objects)
`callback` | `func`      | false    | 

### License

MIT

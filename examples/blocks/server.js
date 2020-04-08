/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const {readdirSync, readFileSync, writeFileSync} = require("fs");

const getDirectories = source =>
    readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

const data = getDirectories("./").map(path => {
    return {
        path: `${path}/thumbnail.png`,
        description: readFileSync(`${path}/README.md`).toString()
    };
});

writeFileSync("./data.json", JSON.stringify(data));

const {WebSocketServer} = require("@finos/perspective");
new WebSocketServer({assets: [__dirname]});

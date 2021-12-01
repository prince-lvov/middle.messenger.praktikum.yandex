// ./node_modules/.bin/mocha --require ts-node/register components/**/*.spec.ts
import Router from "./router";

import { assert } from "chai";
import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><div class="app"></div>');
global.document = dom.window.document;
global.window = global.document.defaultView;

describe('Router test', () => {

    it('Add routes in router', () => {

        let my_router = new Router()
        my_router.addRoute({
            component: () => {},
            name: 'settings',
            path: '/settings'
        })

        assert.equal(my_router.routes[0].path, '/settings')

    })

})
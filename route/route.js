class Block {
    getContent() { }

    show() {
        console.log('show');
    }

    hide() {
        console.log('hide');
    }
}

class Button extends Block {
    getContent() {
        return 'Button';
    }
}

function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    root.textContent = block.getContent();
    return root;
}

class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

const route = new Route('/buttons', Button, {
    rootQuery: '.app',
});

route.render();

console.log(route._pathname, route._props);

route.navigate('/buttons');
route.navigate('/trash');
route.leave();
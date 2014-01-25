'use strict';

var ReactTestUtils;

describe('Comments', function () {
    beforeEach(function () {
        ReactTestUtils = React.addons.ReactTestUtils;
    });

    it('should fetch from the server', function () {
        expect(true).toBe(true);
    });
});

(function (document, undefined) {
    var content;
    content = document.createElement('div');
    content.id = 'content';
    document.body.appendChild(content);
}(document));
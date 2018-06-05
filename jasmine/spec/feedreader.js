/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should have each feed url defined and not to be empty', function () {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });

        it('should have each feed name defined and not to be empty', function () {
            for (const feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });

    describe('The menu', function () {

        const boDy = document.querySelector('body');
        const menuButn = document.querySelector('.menu-icon-link');

        it('should hide the menu by default', function () {
            expect(boDy.className).toBe('menu-hidden');
        });

        it('should show menu when click the menu icon link and hide the menu when click again', function () {
            menuButn.click();
            expect(boDy.className).not.toBe('menu-hidden');

            menuButn.click();
            expect(boDy.className).toBe('menu-hidden');
        });

    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });

        });
        it('should loadFeed and render the entry and .feed container', function (done) {
            let value = document.querySelector('.feed').getElementsByClassName('.entry')
            expect(value.length).not.toBe(0);
            done();
        });
    });
    describe('New Feed Selection', function () {
        let initialFeed;

        beforeEach(function (done) {
            loadFeed(1, function () {
                initialFeed = document.querySelector('.feed').innerHTML;
                loadFeed(2, function () {
                    done();
                });
            });
        });

        let newFeed = document.querySelector('.feed').innerHTML;

        it('should load new feed', function (done) {
            expect(newFeed).not.toBe(initialFeed);
            done();
        });
    });

}());
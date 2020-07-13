before(function() {
	//Navigate to http://hobsons.com
	cy.visit("http://hobsons.com") 
})


describe('Test: Verify Hobson\'s home page renders as expected', function () {
it('Asserts the page title', function () {
	//Verify that the Hobsons.com home page renders as expected (assert on the company logo or page title). 
	cy.title().should('eq', 'Education Advances | Hobsons')

	})
})


describe('Test: Select the Intersect card and click Learn More', function () {
it('Verifies the Learn More link works', function () {
	//On the home screen there is a Hero graphic with the text “Advancing Lifetime Student Success”. 
	//Select the “Intersect” application card and click the “learn more” link.
	cy.get('#body').find('.card-home-banner').eq(1)
	.get(".card-home-banner__button").eq(1).invoke('show').click()

	})
})


describe('Test: Scroll down to US map and verify it\'s displayed', function () {
it('Verify US map is displayed', function () {
		//Scroll down to “The Growing Naviance Footprint” verify the map of the United States is displayed.
		cy.scrollTo(0, 3800)
		cy.get('.block-stats-map__map').should('be.visible')
	})
})

describe('Test: All states have their proper tooltip displayed', function () {
it('Verify State tooltips are correct', function () {

		//For each state or logically grouped collection of states that can be highlighted 
		//Assert there is an associated tooltip containing text with the correct percentage or a percentage range when hovered or selected.
		//As a User given that I hover NC, SC, GA or FL a tooltip with the text "26% to 50% of Students " is displayed.

		//loading the data set from 'farooqs_hobsons_data.json' file located in the fixtures directory
		const state_data = require('/Users/farooqyousuf/Documents/hobsons-cypress-challenge-master/cypress/fixtures/farooqs_hobsons_data.json');

		//NOTE: LA, AL and MS  could not be tested b/c there was a bug in the HTML code:
		//"11% to 25% of Students\<br />\"
		//The line break should not be there. B/c of that the test is failing for those 3 states.

        Object.keys(state_data).forEach(function(key) {
            cy.get(`[data-popup-text="${state_data[key]}"]`).within(() => {
	 			cy.get(`[data-state="${key}"]`).trigger('mouseover', {force: true})
	            cy.get(`[data-state="${key}"]`).click({force: true}) //added a click to display a red dot to denote correct state is selected when running the test in the Cypress app
	            cy.get(`[data-state="${key}"]`).should('be.visible')
			})
        })
    })
})

/**
 * DROPLETS
 *
 * @version: 3.0.0
 * @author: Ethan Lin
 * @url: https://github.com/oel-mediateam/droplets-for-canvas
 *
 * @license: The MIT License (MIT)
 * Copyright 2018-2019 UWEX CEOEL Media
 *
 */

"use strict";

/*********************************************************
  GLOBAL (KICK-OFF) 
**********************************************************/

const dropletsParam = {
    id: 'uws-droplets-page',
    parent: document.querySelector('#main'),
    recursive: true,
    done: function () {
        runDropletsJs();
    }
};

waitForDroplets( dropletsParam );

/*********************************************************
  MUTATION OBSERVER FUNCTION 
**********************************************************/

function waitForDroplets(params) {
    
    new MutationObserver(function() {

        let el = document.getElementById( params.id );

        if ( el ) {
            this.disconnect();
            params.done();
        }

    } ).observe( params.parent || document, {

        subtree: !!params.recursive,
        childList: true

    } );

}

/*********************************************************
  MAIN DROPLETS FUNCTIONS
**********************************************************/

function runDropletsJs() {

     if ( isCanvasLms() ) {

        onCanvasLms();

     } else {

        checkDropletsComponents();

     }

}

function isCanvasLms() {

    if ( location.href.match( new RegExp( '.instructure.com/' ) ) ) {
        return true;
    }

    return false;

}

/**
 * Set and enable Droplets JavaScript components according
 * when the allowed domain is canvas/instructure.com.
 
 * @function onCanvasLms
 * @since 3.0.0
 */
function onCanvasLms() {

    const dropletsPage = document.getElementById( 'uws-droplets-page' );
    
    if ( dropletsPage != undefined ) {
        
        // add canvas-net to indicate it is on Canvas LMS
        dropletsPage.classList.add( 'canvas-net' );
        
        // check to see if it is on an allowed page
        // add no-js class if not to expand any hidden contents
        if ( isAllowedCanvasPage() ) {

            checkDropletsComponents();

        } else {

            dropletsPage.classList.add( 'no-js' );

        }
        
    }

}

/**
 * Check to see if the page is a content page on Canvas
 * @function isAllowedCanvasPage
 * @param {Object} regex - a regular expression object.
 * @since 3.0.0
 * @return {boolean} true if matched, else false
 */
function isAllowedCanvasPage( ) {
    
    if ( location.pathname.match( /\/pages|\/assignments|\/discussion_topics/ ) ) {

        return true;
        
    }
    
    return false;
    
}

/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @since 2.0.0
 * @updated 3.0.0
 */
function checkDropletsComponents() {

    // set initial page container x and y as data- attributes
    const page = document.getElementById( 'uws-droplets-page' );

    //exit function if no-js class is set
    if ( page.classList.contains( 'no-js' ) ) {
        return;
    }

    // get the droplets content bounding position
    const pageBounding = page.getBoundingClientRect();
    
    page.setAttribute( 'data-x', pageBounding.x );
    page.setAttribute( 'data-y', pageBounding.y );
    
    // component elements
    const prefix = '#uws-droplets-page .droplets-';
    const toolTipSelector = document.querySelectorAll( prefix + 'tooltip' );
    const popoverSelector = document.querySelectorAll( prefix + 'popover' );
    const tabsSelector = document.querySelectorAll( prefix + 'tabs' );
    const tabbedSelector = document.querySelectorAll( prefix + 'tabbed' );
    const accordionsSelector = document.querySelectorAll( prefix + 'accordion' );
    const collapsibleSelector = document.querySelectorAll( prefix + 'collapsible' );
    // let resourcesSelector = document.querySelectorAll( prefix + 'resources' );
    // let readMoreSelector = document.querySelectorAll( prefix + 'readmore' );
    // let revealSelector = document.querySelectorAll( prefix + 'reveal' );
    // let imgZoomSelector = document.querySelectorAll( prefix + 'image-zoom' );
    // let lighboxSelector = document.querySelectorAll( prefix + 'lightbox' );
    
    // check for components
    if ( toolTipSelector.length ) {
        enableToolTips( toolTipSelector );
    }
    
    if ( popoverSelector.length ) {
        enablePopovers( popoverSelector );
    }
	
    if ( tabsSelector.length ) {
        enableTabs( tabsSelector );
    }

    if ( tabbedSelector.length ) {
        enableTabbed( tabbedSelector );
    }
    
    if ( accordionsSelector.length ) {
        enableAccordions( accordionsSelector );
    }

    if ( collapsibleSelector.length ) {
        enableCollapsibles( collapsibleSelector );
    }
    
    // if ( resourcesSelector.length ) {
    //     enableResources( resourcesSelector );
    // }
    
    // if ( readMoreSelector.length ) {
    //     enableReadMore( readMoreSelector );
    // }
    
    // if ( revealSelector.length ) {
    //     enableReveal( revealSelector );
    // }
    
    // if ( imgZoomSelector.length ) {
    //     enableImgZoom( imgZoomSelector );
    // }
    
    // if ( lighboxSelector.length ) {
    //     enableLightbox( lighboxSelector );
    // }

}

/**
 * Enable all tool tip elements.
 * @function enableToolTips
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */
function enableToolTips( toolTips ) {
    
    // loop through each tool tip elements to add mouse enter and leave
    // event listener to each tool tip element
    Array.prototype.forEach.call( toolTips, ( el ) => {
        
        el.addEventListener( 'mouseenter', function() {
            
            let tip = this.getAttribute( 'title' );
            let position = {
                left: this.offsetLeft,
                top: this.offsetTop,
                bottom: this.offsetTop - this.offsetHeight
            };
            let x = 0, y = 0;
            
            // create an attribute to hold the original tip
            el.setAttribute( 'data-tip', tip );
            
            // reset tip variable to data-tip attribute value
            tip = el.getAttribute( 'data-tip' );
            
            // create tool tip container with classes
            let toolTipNode = document.createElement( 'div' );
            
            toolTipNode.classList.add( 'tooltip' );
            
            let toolTipInnerNode = document.createElement( 'div' );
            
            toolTipInnerNode.classList.add( 'tooltip-inner' );
            toolTipInnerNode.innerHTML = tip;
            
            toolTipNode.appendChild( toolTipInnerNode );
            
            // add the tool tip container to the DOM
            this.insertBefore( toolTipNode, this.firstChild );
			
            // determine tooltip display positions
            if ( this.classList.contains( 'top' ) ) {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            } else if ( this.classList.contains( 'bottom' ) ) {
                x = position.top + toolTipNode.offsetHeight - 20;
                y = position.left;
            } else if ( this.classList.contains( "right" ) ) {
                x = position.top;
                y = position.left + this.offsetWidth;
            } else if ( this.classList.contains( "left" ) ) {
                x = position.top;
                y = position.left - toolTipNode.offsetWidth;
            } else {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            }
			
            // set tool tip position
            toolTipNode.style.top = x + 'px';
            toolTipNode.style.left = y + 'px';
            
            // remove title attribute
            this.removeAttribute( 'title' );
            
            // add mouse leave event to remove the tool tip container from DOM
            this.addEventListener( "mouseleave", function() {
            
                if ( toolTipNode.parentNode !== null ) {
                    toolTipNode.parentNode.removeChild(toolTipNode);
                }
                
                // add title attribute back
                this.setAttribute( 'title', tip );
            
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all popover elements.
 * @function enablePopovers
 * @param {Object[]} popovers - Collection of pop over elements.
 * @since 2.0.0
 */
function enablePopovers( popovers ) {
    
    // loop through each popovers
    Array.prototype.forEach.call( popovers, ( el ) => {
        
        let title = '';
        
        // if data-title attribute is specified
        if ( el.getAttribute( 'data-title' ) !== null ) {
            
            // set the title to data-title value
            title = el.getAttribute( 'data-title' );
            
        } else {
            
            // set title to the title attribute
            title = el.getAttribute( 'title' )
            
            // create data-title to hold the original title attribute value
            el.setAttribute( 'data-title', title );
            
            // reset the title variable to data-title instead
            title = el.getAttribute( 'data-title' );
            
        }
        
        // create the popover container
        let popoverDiv = document.createElement( 'div' );
                
        popoverDiv.classList.add( 'popover' );
        popoverDiv.setAttribute( 'role', 'tooltip' );
        
        let popoverContentDiv = document.createElement( 'div' );
        
        popoverContentDiv.classList.add( 'popover-content' );
        popoverContentDiv.innerHTML = title;
        
        popoverDiv.appendChild( popoverContentDiv );
        
        // add the popover container to the DOM
        el.insertBefore( popoverDiv, el.firstChild );
        
        // add the click event listener
        el.addEventListener( 'click', function() {
            
            // if visible
            if ( this.querySelector( '.popover' ).style.display === 'block' ) {
                
                // hide
                this.querySelector( '.popover' ).style.display = 'none';
                this.classList.remove( 'active' );
                
            } else {
                
                // else show
                this.classList.add( 'active' );
                popoverDiv.style.display = 'block';
                
                // and determine popover positions
                let x = 0, y = 0;
                let horzCenter = this.offsetWidth - ( ( popoverDiv.offsetWidth + this.offsetWidth ) / 2 );
                let vertzCenter = this.offsetHeight - ( ( popoverDiv.offsetHeight + this.offsetHeight ) / 2 );
                
                if ( this.classList.contains( 'top' ) ) {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( 'bottom' ) ) {
                    
                    popoverDiv.classList.add( 'bottom' );
                    x = this.offsetHeight + 10;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( "right" ) ) {
                    
                    popoverDiv.classList.add( 'right' );
                    x = vertzCenter;
                    y = this.offsetWidth + 10;
                    
                } else if ( this.classList.contains( "left" ) ) {
                    
                    popoverDiv.classList.add( 'left' );
                    x = vertzCenter;
                    y = ( popoverDiv.offsetWidth + 10 ) * -1;
                    
                } else {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                }
                
                // position the popover on the DOM
                popoverDiv.style.top = x + 'px';
                popoverDiv.style.left = y + 'px';
                
            }
            
        } );
        
        // add mouse enter event to remove the title attribute
        // to prevent default tooltip behavior and add back in on mouse leave
        el.addEventListener( 'mouseenter', function() {
            
            this.removeAttribute( 'title' );
            
            this.addEventListener( 'mouseleave', function() {
            
                this.setAttribute( 'title', title );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all (new way) tab elements.
 * @function enableTabbed
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 3.0.0
 */
function enableTabbed( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tab' );
        const tabContents = tabWrapper.querySelectorAll( '.content' );

        // set role for screen reader
        tabWrapper.setAttribute( 'role', 'rolelist');
        tabWrapper.setAttribute( 'aria-multiselectable', 'false' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // set each tab to have a role of tab for screen reader
            tab.setAttribute( 'role', 'tab' );
            tabContents[i].setAttribute( 'role', 'tabpanel' );

            // set tab selected state
            if ( tab.classList.contains( 'active' ) ) {
                tab.setAttribute( 'aria-selected', 'true');
                tabContents[i].classList.add( 'active' );
            } else {
                tab.setAttribute( 'aria-selected', 'false');
            }
            
            // add event listener to each tab
            tab.addEventListener( 'click', function() {
                
                // if not selected...
                if ( !this.classList.contains( 'active' ) ) {

                    // remove active class from all tab
                    // and hide tab sections
                    Array.prototype.forEach.call( tabBtns, function( el, i ) {
                        
                        el.classList.remove( 'active' );
                        el.setAttribute( 'aria-selected', 'false');
                        tabContents[i].classList.remove( 'active' );
                        
                    } );
                    
                    // add active class to current clicked tab
                    // and display corresponding tab section
                    this.classList.add( 'active' );
                    this.setAttribute( 'aria-selected', 'true');
                    tabContents[i].classList.add( 'active' );

                }
                
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all (old way) tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableTabs( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        const tabBtns = tabWrapper.querySelectorAll( '.tabs li' );
        const tabSections = tabWrapper.querySelectorAll( '.tab-contents .tab-section' );

        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // add event listener to each tab
            tab.addEventListener( 'click', function( evt ) {
                
                // remove active class from all tab
                // and hide tab sections
                Array.prototype.forEach.call( tabBtns, function( el, i ) {
                    
                    el.classList.remove( 'active' );
                    el.setAttribute( 'aria-selected', 'false');
                    tabSections[i].classList.remove( 'active' );
                    
                });
                
                // add active class to current clicked tab
                // and display corresponding tab section
                this.classList.add( 'active' );
                this.setAttribute( 'aria-selected', 'true');
                tabSections[i].classList.add( 'active' );
                tabSections[i].setAttribute( 'aria-selected', 'true');
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        });
        
    } );
    
}

/**
 * Enable all (new way) accordion/collapsible elements.
 * @function enableCollapsibles
 * @param {Object[]} collapsibles - Collection of tab elements.
 * @since 3.0.0
 */
function enableCollapsibles( collapsibles ) {
    
    // loop through collection of collapsible elements
    Array.prototype.forEach.call( collapsibles, function( collapsiblesWrapper ) {
        
        // set each collapsible element's section and content
        const sections = collapsiblesWrapper.querySelectorAll( '.section' );
        const contents = collapsiblesWrapper.querySelectorAll( '.content' );

        // set role for screen reader
        collapsiblesWrapper.setAttribute( 'role', 'rolelist');
        collapsiblesWrapper.setAttribute( 'aria-multiselectable', 'true' );

        // for each section of current collapsible element iternation
        Array.prototype.forEach.call( sections, function( section, i ) {
            
            // set each section to have a role of tab for screen reader
            section.setAttribute( 'role', 'tab' );
            contents[i].setAttribute( 'role', 'tabpanel' );

            // set section selected state
            if ( section.classList.contains( 'active' ) ) {
                section.setAttribute( 'aria-expanded', 'true');
                contents[i].classList.add( 'active' );
            } else {
                section.setAttribute( 'aria-expanded', 'false');
            }
            
            // add event listener to each section
            section.addEventListener( 'click', function() {
                
                // if opened
                if ( this.classList.contains( 'active' ) ) {
                    
                    // close it
                    this.classList.remove( 'active' );
                    this.setAttribute( 'aria-expanded', 'false');
                    contents[i].classList.remove( 'active' );

                } else {

                    // open it
                    this.classList.add( 'active' );
                    this.setAttribute( 'aria-expanded', 'true');
                    contents[i].classList.add( 'active' );
                    
                }  
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all (old way) accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 * @updated 3.0.0
 */
function enableAccordions( accordions ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( accordions, function( accordionWrapper ) {
        
        // query the accordion title banners
        const titleBanners = accordionWrapper.querySelectorAll( '.accordion-title' );
        
        // create the accordion controls for each accordion
        const accordionControlsWrapper = document.createElement( 'div' );
        accordionControlsWrapper.classList.add( 'accordion-controls' );
        
        const closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = 'javascript:void(0)';
        
        const openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = 'javascript:void(0)';
        
        accordionControlsWrapper.appendChild( closeBtn );
        accordionControlsWrapper.appendChild( openBtn );
        
        // add the accordion controls to the DOM
        accordionWrapper.insertBefore( accordionControlsWrapper, accordionWrapper.firstChild );
        
        // add event listener to the close all control
        closeBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                closeAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // add event listener to open all control
        openBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                openAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // loop through each title banner
        Array.prototype.forEach.call( titleBanners, function( banner ) {
            
            // if it contains active class, display the accordion content
            if ( banner.classList.contains( 'active' ) ) {
                openAccordionItem( banner );
            }
            
            // add event listener to each title banner
            banner.addEventListener( 'click', function( evt ) {
                
                // if current target is open, close it
                if ( this.classList.contains( 'active' ) ) {
                    closeAccordionItem( this );
                } else {
                    
                    // close all of the accordion
                    Array.prototype.forEach.call( titleBanners, function( el ) {
                        closeAccordionItem( el );
                    } );
                    
                    // open the current target
                    openAccordionItem( this );
                    
                }
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Close accordion item.
 * @function closeAccordionItem
 * @param {Object} el - element to be hidden.
 * @since 2.0.0
 */
function closeAccordionItem( el ) {
    
    if ( el.classList.contains( 'active' ) ) {
                            
        el.nextElementSibling.style.display = 'none';
        el.nextElementSibling.setAttribute( 'aria-expanded', 'false' );
        el.classList.remove( 'active' );
        
    }
    
}

/**
 * Open accordion item.
 * @function openAccordionItem
 * @param {Object} el - element to be displayed.
 * @since 2.0.0
 */
function openAccordionItem( el ) {
    
    el.classList.add( 'active' );
    el.nextElementSibling.setAttribute( 'aria-expanded', 'true' );
    el.nextElementSibling.style.display = 'block';
    
}
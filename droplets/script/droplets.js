"use strict";

/**
 * On DOM ready, execute checkDropletsComponents function.
 * @param {checkDropletsComponents} fn - the callback to check droplet components
 */
( function ready( fn ) {
    
    if ( document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading' ) {
        fn();
    } else {
        document.addEventListener( 'DOMContentLoaded', fn );
    }
    
} ) ( checkDropletsComponents );

/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @callback checkDropletsComponents
 * @since 2.0.0
 */
function checkDropletsComponents() {
    
    var toolTipSelector = document.getElementsByClassName( 'droplets-tooltip' );
    var tabsSelector = document.getElementsByClassName( 'droplets-tabs' );
    var accordionsSelector = document.getElementsByClassName( 'droplets-accordion' );
    var resourcesSelector = document.getElementsByClassName( 'droplets-resources' );
    
    if ( toolTipSelector.length ) {
		enableToolTip( toolTipSelector );
	}
	
	if ( tabsSelector.length ) {
		enableTabs( tabsSelector );
	}
	
	if ( accordionsSelector.length ) {
		enableAccordions( accordionsSelector );
	}
	
	if ( resourcesSelector.length ) {
		enableResources( resourcesSelector );
	}
    
}

/**
 * Enable all tool tip elements.
 * @function enableToolTip
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */
function enableToolTip( toolTips ) {
    
    // loop through each tool tip elements to add mouse enter and leave
    // event listener to each tool tip element
    Array.prototype.forEach.call( toolTips, function( el ) {
        
        el.addEventListener( 'mouseenter', function() {
            
            var tip = this.getAttribute( 'data-tip' );
			var position = {
    			left: this.offsetLeft,
    			top: this.offsetTop,
    			bottom: this.offsetTop - this.offsetHeight
            };
			var x = 0, y = 0;
            
            // create tool tip container with classes
            var toolTipNode = document.createElement( 'div' );
            
            toolTipNode.classList.add( 'tooltip' );
            
            var toolTipInnerNode = document.createElement( 'div' );
            
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
                x = position.top + toolTipNode.offsetHeight - 5;
                y = position.left;
			} else if ( this.classList.contains( "right" ) ) {
                x = position.top;
                y = position.left + this.offsetWidth + 5;
			} else if ( this.classList.contains( "left" ) ) {
                x = position.top;
                y = position.left - toolTipNode.offsetWidth - 5;
			} else {
    			x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
			}
			
			// set tool tip position
            toolTipNode.style.top = x + 'px';
            toolTipNode.style.left = y + 'px';
            
            // add mouse leave event to remove the tool tip container from DOM
			this.addEventListener( "mouseleave", function() {
				
				if ( toolTipNode.parentNode !== null ) {
    				toolTipNode.parentNode.removeChild(toolTipNode);
				}
				
			} );
            
        } );
        
    } );
    
}

/**
 * Enable all tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 */
function enableTabs( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        var tabBtns = tabWrapper.querySelectorAll( '.tabs li' );
        var tabSections = tabWrapper.querySelectorAll( '.tab-contents .tab-section' );
        
        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // add event listener to each tab
            tab.addEventListener( 'click', function( evt ) {
                
                // remove active class from all tab
                // and hide tab sections
                Array.prototype.forEach.call( tabBtns, function( el, i ) {
                    
                    el.classList.remove( 'active' );
                    tabSections[i].classList.remove( 'active' );
                    
                });
                
                // add active class to current clicked tab
                // and display corresponding tab section
                this.classList.add( 'active' );
                tabSections[i].classList.add( 'active' );
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        });
        
    } );
    
}

/**
 * Enable all accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 */
function enableAccordions( accordions ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( accordions, function( accordionWrapper ) {
        
        // query the accordion title banners
        var titleBanners = accordionWrapper.querySelectorAll( '.accordion-title' );
        
        // create the accordion controls for each accordion
        var accordionControlsWrapper = document.createElement( 'div' );
        accordionControlsWrapper.classList.add( 'accordion-controls' );
        
        var closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.setAttribute( 'aria-control', 'close all' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = 'javascript:void(0)';
        
        var openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.setAttribute( 'aria-control', 'open all' );
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
        el.setAttribute( 'aria-expanded', 'false' );
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
    
    el.setAttribute( 'aria-expanded', 'true' );
    el.classList.add( 'active' );
    el.nextElementSibling.style.display = 'block';
    
}

/**
 * Enable all accordion elements.
 * @function enableResources
 * @param {Object[]} resources - Collection of resource elements.
 * @since 2.0.0
 */
function enableResources( resources ) {
    
    // loop through collection of resource elements
    Array.prototype.forEach.call( resources, function( resourcesWrapper ) {
        
        // get the resource class selector
        var resourceItems = resourcesWrapper.querySelectorAll( '.resource' );
        
        // loop through each resouces
        Array.prototype.forEach.call( resourceItems, function( resource ) {
            
            // get the cover info selector
            var coverEl = resource.querySelectorAll( '.cover-info' );
            
            // loop through the cover info of each resource
            // There is only 1 element in the array (NodeList) because there is
            // only 1 cover info per resource
            Array.prototype.forEach.call( coverEl, function( el ) {
                
                // create arrow element
                var arrow = document.createElement( 'div' );
                arrow.classList.add( 'arrow' );
                
                // add the arrow next to the cover info
                el.parentNode.insertBefore( arrow, el.nextSibling );
                
                // add event listener to the arrow to toggle the resource
                arrow.addEventListener( 'click', function() {
                    
                    if ( this.parentNode.classList.contains( 'expanded' ) ) {
                        
                        this.parentNode.classList.remove( 'expanded' );
                        
                    } else {
                        
                        this.parentNode.classList.add( 'expanded' );
                        
                    }
                    
                } );
                
            } );
            
        } );
        
    } );
    
}









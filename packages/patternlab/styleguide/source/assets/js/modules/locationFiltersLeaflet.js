
export default (function (window,document,$,undefined) {

  function initFilters () {
    $('.js-location-filters').each(function() {
      let $el = $(this);
      debugger;
      let $resultHeading = $('.js-results-heading'),
        $clearAllButton = '.js-results-heading-clear', // events triggered on parent
        $filterButton = '.js-results-heading-tag' // events triggered on parent
        let $locationFilterParent = $('.js-filter-by-location', $el);
        let $locationFilter = $locationFilterParent.find('input');
        const errorMessage = $locationFilterParent.find('.ma__error-msg')
        const $submitButton = $el.find('.js-location-filters__submit');

        if ($locationFilter.length) {
          // Create the google places autocomplete object and associate it with the zip code text input.
          const locationFilterID = $locationFilter.attr('id');
          let locationInput = document.getElementById(locationFilterID);
          let swLat = $locationFilterParent.data('maPlaceBoundsSwLat');
          let swLng = $locationFilterParent.data('maPlaceBoundsSwLng');
          let neLat = $locationFilterParent.data('maPlaceBoundsNeLat');
          let neLng = $locationFilterParent.data('maPlaceBoundsNeLng');

          let defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(swLat,swLng), new google.maps.LatLng(neLat,neLng));

          // See options: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
          let options = {
            bounds: defaultBounds,
            strictBounds: true,
            types: ['geocode'],
            fields: ['formatted_address', 'geometry', 'name'],
            componentRestrictions: {country: 'us'},
          };

          ma.autocomplete = new google.maps.places.Autocomplete(locationInput, options);


          var placeChanged = false;
          ma.autocomplete.addListener('place_changed', function() {
            console.log('changed')

            const place = ma.autocomplete.getPlace();
            if (!place.geometry || !place.geometry.location) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              errorMessage.addClass('has-error');
              console.log("Not a valid input: '" + place.name + "'");
              return;
            }

            placeChanged = true;
            errorMessage.removeClass('has-error');

            $(document).trigger('ma:GoogleMaps:placeChanged', place);
            console.log(place)
          }); 

          locationInput.onkeyup = (e) => {
            const matches = document.querySelectorAll('.pac-item-query');
            const matchNodes = Array.from(matches)
            const suggestions = matchNodes.map((match) => match.innerText)
            console.log(suggestions)
          }

          // google.maps.event.addDomListener(locationInput, 'keydown', function(e) { 
          //     if (e.key == 'Enter') {
          //         console.log('place changed: '+ placeChanged)
          //         //only submits when the autocomplete dropdown is closed and a valid place is selected
          //         if ($('.pac-container:visible').length || !placeChanged) {
          //           e.preventDefault(); 
          //         } else {
          //           placeChanged = false; 
          //         }
          //     }
          // }); 

          $submitButton.click(function(e) {
            console.log(e)
            console.log('place changed: '+ placeChanged +' clicked')
            if ($('.pac-container:visible').length || !placeChanged) {
              console.log('don\'t submit')
              e.preventDefault(); 
            } else {
              console.log('submit')
              placeChanged = false; 
            }
          })
        }
    });
  };

  // When google map libraries are loaded, initialize places.autocomplete on the location input, if it exists.
  $(document).on('ma:LibrariesLoaded:GoogleMaps', function() {
    initFilters();
  });  

  document.addEventListener('DOMContentLoaded', function() {
    if (window.googleMapsLoaded) {
      initFilters();
    }
  })
})(window,document,jQuery);

// dropdown menu script starts here
// creating a dictionary to map keys to values we'll need to use:
// the keys match the value of the <option> tags in index.html
const chartMap = {
  overall: { image: 'img/chartoverall.png', unit: ' investment per household'},
  single_family: { image: 'img/chartsinglefamily.png', unit: ' investment per owner-occupied household' },
  multifamily: { image: 'img/chartmultifamily.png', unit: ' investment per renter-occupied household' },
  nonresidential: { image: 'img/chartnonresidential.png', unit: ' investment per employee' },
  small_business: { image: 'img/chartsmallbusiness.png', unit: ' investment per small-business employee' },
  mission: { image: 'img/chartmission.png', unit: ' investment per household' },
  federal: { image: 'img/chartfederal.png', unit: ' investment per household' },
}

// selecting elements globally
const $imageContainer = d3.select('.chart-image')
const $unitContainer = d3.select('.update_unit')
const $unitWrapper = d3.select('.unit-wrapper')

// https://stackoverflow.com/questions/42846985/swap-a-d3-js-created-drop-down-menu-into-a-html-created-drop-down-menu
d3
  .select("#opts") // select the <select> tag in index.html 
  .on("change", function() { // adds event listener to <select>
    // with this.value, we can access the values in the map object defined atop the file
    // gets values from map object, using destructured assignment
    const { image, unit } = chartMap[this.value] 

    // change the src attr of <img>. this will switch the image displayed
    $imageContainer.attr('src', `${image}`)
    
    // change the text of span.update_unit
    $unitContainer.text(unit)

    // unhides the text where unit is contained
    $unitWrapper.classed('hidden', false)
  });

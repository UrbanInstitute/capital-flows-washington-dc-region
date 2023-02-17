// header script starts here

//function toggle_visibility(id) {
//    var e = document.getElementById(id);
//    if (e.style.display == 'inline-block')
//        e.style.display = 'none';
//    else
//        e.style.display = 'inline-block';
//}

//$(function () {
//    var shrinkHeader = 200;
//    $(window).scroll(function () {
//        var scroll = getCurrentScroll();
//        if (scroll >= shrinkHeader) {
//            $('#header-pinned').addClass('is-visible');
//        } else {
//            $('#header-pinned').removeClass('is-visible');
//        }
//    });
//
//    function getCurrentScroll() {
//        return window.pageYOffset || document.documentElement.scrollTop;
//    }
//});


// header script ends here
// main script starts here
let mainPalette = {
  blue: "#1696d2",
  grey: "#d2d2d2",
  black: "#000000",
  yellow: "#fdbf11",
  pink: "#ec008b",
  green: "#55b748",
  darkGrey: "#5c5859",
  red: "#db2b27"
}

let sequentialPalettes = {
  blue: ["#CFE8F3","#A2D4EC","#73BFE2","#46ABDB","#1696D2","#12719E","#0A4C6A","#062635"],
  grey: ["#F5F5F5","#ECECEC","#E3E3E3","#DCDBDB","#D2D2D2","#9D9D9D","#696969","#353535"],
  orange: ["#FFF2CF","#FCE39E","#FDD870","#FCCB41","#FDBF11","#E88E2D","#CA5800","#843215"],
  pink: ["#F5CBDF","#EB99C2","#E46AA7","#E54096","#EC008B","#AF1F6B","#761548","#351123"],
  green: ["#DCEDD9","#BCDEB4","#98CF90","#78C26D","#55B748","#408941","#2C5C2D","#1A2E19"],
  darkGrey: ["#D5D5D4","#ADABAC","#848081","#5C5859","#332D2F","#262223","#1A1717","#0E0C0D"],
  red: ["#F8D5D4","#F1AAA9","#E9807D","#E25552","#DB2B27","#A4201D","#6E1614","#370B0A"]
}

// main script ends here
// dropdown menu script starts here
// creating a dictionary to map keys to values we'll need to use:
// the keys match the value of the <option> tags in index.html
const chartMap = {
  overall: { image: 'img/chart1.jpg', unit: 'per kilometers'},
  single_family: { image: 'img/chart2.jpg', unit: 'per miles' },
  multifamily: { image: 'img/chart3.jpg', unit: 'per centimeters' },
  nonresidential: { image: 'img/chart4.jpg', unit: 'per inches' },
  small_business: { image: 'img/chart5.jpg', unit: 'per stones' },
  mission: { image: 'img/chart6.jpg', unit: 'per decameters' },
  federal: { image: 'img/chart7.jpg', unit: 'per light-years' },
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

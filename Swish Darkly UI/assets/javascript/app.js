

// don't autofill
$('input').attr('autocomplete','off');
$('#hfirst, #hlast').attr('autocomplete','new-password');



// Picker for category
$('.datepicker').on('changeDate', function(ev){
    $(this).datepicker('hide');
    $(".dropdown-menu").click();
});

$('.datepicker').datepicker().on('click', function () {
    $('.datepicker').click(function(e) {
        e.stopPropagation(); // prevent clicks on datepicker from collapsing 'parent'
    });
});

// modals
$(".btn").on("click", function (event) {
    if ($(this).hasClass("disabled")) {
        event.stopPropagation();
    }
});

// highlight takeitems rows
function navigate (e) {
    var origin = $('.table-info'),
        direction = false;
    switch(e.which) {
        case 38:
            direction = 'prev';
            break;
        case 40:
            direction = 'next';
            break;
    }
    if (direction && origin[direction + 'All']().length) {
        origin.removeClass('table-info')[direction]("tr").addClass('table-info');
        // console.log(this);
        if ($('.table-info').hasClass("placeholder") && ($('.table-info').next().length))
        {
            $('.table-info').removeClass('table-info')[direction]("tr").addClass('table-info');
        }
        if ($('.table-info').hasClass("placeholder") && ($('.table-info').next().length === 0))
        {
            $('.table-info').removeClass('table-info').prev("tr").addClass('table-info');
        }
        groupActive();
        var containerTop = $('#table-responsive').scrollTop();
        var containerBottom = containerTop + $('#table-responsive').height();
        var elemTop = $('.table-info').get(0).offsetTop -27;
        var elemBottom = elemTop + $('.table-info').height() +27;
        if (elemTop < containerTop) {
            $('#table-responsive').scrollTop(elemTop);
        } else if (elemBottom > containerBottom) {
            $('#table-responsive').scrollTop(elemBottom - $('#table-responsive').height());
        }
    }
}
$(document).on('keyup', navigate);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

$('#table-responsive table tbody tr').on('click', function(){
    $('#table-responsive table tbody tr').removeClass('table-info');
    $(this).addClass('table-info');
    groupActive();
});


function groupActive() {
    if ($('.table-info').hasClass("group")) {
        $('.group').removeClass('groupActive');
    } else {
        $('.group').removeClass('groupActive');
        $('.table-info').prevAll('.group:first').addClass('groupActive');
    }
}



$('td .btn').on('click', function(e){
    e.stopPropagation();
});

$('td .custom-switch').on('click', function(e){
    e.stopPropagation();
});

$('td .form-control').on('click', function(e){
    e.stopPropagation();
});




// Sortable Take Items
$( function() {
    $( ".sortable" ).sortable({
        items: ".take",
        axis: "y",
        appendTo: 'body',
        cursor: "grabbing",
        handle: '.handle',
        opacity: 0.5,

        start: function (event, ui) {

            ui.placeholder.html(ui.item.html());

            ui.helper.css('margin-top', $("#table-responsive").scrollTop());
            var oldGroup = $(ui.item).prevAll('tr[id^=group]:first');
            var oldId = (oldGroup.attr('id'));
            $(ui.item).removeClass(oldId);

            var prevgroup = $(ui.item).prev();
            var nextgroup = $(ui.item).next().next();
            if (prevgroup.hasClass("group") && nextgroup.hasClass("group") || (prevgroup.hasClass("group") && nextgroup.length === 0))
            {
                $(ui.item).after('<tr class="take show ' + oldId +' placeholder"><td></td><td></td><td></td><td class="toggleOffTake"></td><td class="toggleOffTake"></td><td class="toggleOffTake"></td><td class="toggleOffTake"></td><td class="toggleOffTake"></td>\</tr>');
                changeLayout();
            }

            // console.log(oldId);

        },
        beforeStop: function (event, ui){
            ui.helper.css('margin-top',0);
        },
        sort: function(event, ui) {
            var top = event.clientY - $('.sortable').offset().top  -  $("#table-responsive").scrollTop();
            ui.helper.css({'top' : top + 'px'});
            ui.helper.css('margin-top', $("#table-responsive").scrollTop());
        },


        stop: function (event, ui) {
            var newGroup = $(ui.item).prevAll('tr[id^=group]:first');
            var newId = (newGroup.attr('id'));
            $(ui.item).addClass(newId);

            var prevgroup = $(ui.item).prev();
            var nextgroup = $(ui.item).next();

            if (prevgroup.hasClass("placeholder"))
            {
                prevgroup.remove();
            }
            if (nextgroup.hasClass("placeholder"))
            {
                nextgroup.remove();
            }
            // console.log(newId);
            groupActive();
            },
    });
} );

// Sortable Import Take Items
$( function() {
    $( ".sortable2" ).sortable({
        items: ".take",
        axis: "y",
        appendTo: 'body',
        cursor: "grabbing",
        handle: '.handle',
        opacity: 0.5,

        start: function (event, ui) {
            ui.helper.css('margin-top', $("#importTake").scrollTop());
            var oldGroup = $(ui.item).prevAll('tr[id^=takeGroup]:first');
            var oldId = (oldGroup.attr('id'));
            $(ui.item).removeClass(oldId);

            var prevgroup = $(ui.item).prev();
            var nextgroup = $(ui.item).next().next();
            if (prevgroup.hasClass("group") && nextgroup.hasClass("group") || (prevgroup.hasClass("group") && nextgroup.length === 0))
            {
                $(ui.item).after('<tr class="take show ' + oldId +' placeholder"><td></td><td></td><td></td><td></td>\</tr>');
            }
            // console.log(oldId);

        },
        beforeStop: function (event, ui){
            ui.helper.css('margin-top',0);
        },
        sort: function(event, ui) {
            var top = event.clientY - $('.sortable2').offset().top  -  $("#importTake").scrollTop();
            ui.helper.css({'top' : top + 'px'});
            ui.helper.css('margin-top', $("#importTake").scrollTop());
        },


        stop: function (event, ui) {
            var newGroup = $(ui.item).prevAll('tr[id^=takeGroup]:first');
            var newId = (newGroup.attr('id'));
            $(ui.item).addClass(newId);

            var prevgroup = $(ui.item).prev();
            var nextgroup = $(ui.item).next();
            if (prevgroup.hasClass("placeholder"))
            {
                prevgroup.remove();
            }

            if (nextgroup.hasClass("placeholder"))
            {
                nextgroup.remove();
            }
            // console.log(newId);

        },
    });
} );



// toggle collapsed groups
$(".groupFolder").on("click", function(event) {
    var datatarget = $(this).attr('data-target')
    $(datatarget).collapse('toggle');

        var newsrc;
        if($('img', this).attr("src")==="assets/images/UI%20Images/folder-24px.svg")
        {
            newsrc="assets/images/UI%20Images/folder_open-24px.svg";
            $('img', this).attr("src", newsrc);
        }
        else
        {
            newsrc="assets/images/UI%20Images/folder-24px.svg";
            $('img', this).attr("src", newsrc);
        }
});







// // function is used for dragging and moving in build mode
(function($, undefined) {
    if ($.fn.resizable)
        return;


    $.fn.resizable = function fnResizable(options) {
        var opt = {
            // selector for handle that starts dragging
            handleSelector: null,
            // resize the width
            resizeWidth: true,
            // resize the height
            resizeHeight: true,
            // hook into start drag operation (event passed)
            onDragStart: null,
            // hook into stop drag operation (event passed)
            onDragEnd: null,
            // hook into each drag operation (event passed)
            onDrag: null,
            // disable touch-action on $handle
            // prevents browser level actions like forward back gestures
            touchActionNone: true
        };
        if (typeof options == "object") opt = $.extend(opt, options);

        return this.each(function () {
            var startPos, startTransition;

            var $el = $(this);
            var $handle = opt.handleSelector ? $(opt.handleSelector) : $el;

            if (opt.touchActionNone)
                $handle.css("touch-action", "none");

            $el.addClass("resizable");
            $handle.bind('mousedown.rsz touchstart.rsz', startDragging);

            function noop(e) {
                e.stopPropagation();
                e.preventDefault();
            };

            function startDragging(e) {
                startPos = getMousePos(e);
                startPos.width = parseInt($el.width(), 10);
                startPos.height = parseInt($el.height(), 10);

                startTransition = $el.css("transition");
                $el.css("transition", "none");

                if (opt.onDragStart) {
                    if (opt.onDragStart(e, $el, opt) === false)
                        return;
                }
                opt.dragFunc = doDrag;

                $(document).bind('mousemove.rsz', opt.dragFunc);
                $(document).bind('mouseup.rsz', stopDragging);
                if (window.Touch || navigator.maxTouchPoints) {
                    $(document).bind('touchmove.rsz', opt.dragFunc);
                    $(document).bind('touchend.rsz', stopDragging);
                }
                $(document).bind('selectstart.rsz', noop); // disable selection
            }

            function doDrag(e) {
                var pos = getMousePos(e);

                if (opt.resizeWidth) {
                    var newWidth = startPos.width + pos.x - startPos.x;
                    $el.width(newWidth);
                }

                if (opt.resizeHeight) {
                    var newHeight = startPos.height + pos.y - startPos.y;
                    $el.height(newHeight);

                    changeLayout();
                }

                if (opt.onDrag)
                    opt.onDrag(e, $el, opt);

                //console.log('dragging', e, pos, newWidth, newHeight);
            }

            function stopDragging(e) {
                e.stopPropagation();
                e.preventDefault();

                $(document).unbind('mousemove.rsz', opt.dragFunc);
                $(document).unbind('mouseup.rsz', stopDragging);

                if (window.Touch || navigator.maxTouchPoints) {
                    $(document).unbind('touchmove.rsz', opt.dragFunc);
                    $(document).unbind('touchend.rsz', stopDragging);
                }
                $(document).unbind('selectstart.rsz', noop);

                // reset changed values
                $el.css("transition", startTransition);

                if (opt.onDragEnd)
                    opt.onDragEnd(e, $el, opt);

                return false;
            }

            function getMousePos(e) {
                var pos = { x: 0, y: 0, width: 0, height: 0 };
                if (typeof e.clientX === "number") {
                    pos.x = e.clientX;
                    pos.y = e.clientY;
                } else if (e.originalEvent.touches) {
                    pos.x = e.originalEvent.touches[0].clientX;
                    pos.y = e.originalEvent.touches[0].clientY;
                } else
                    return null;

                return pos;
            }
        });
    };
})(jQuery,undefined);

$(".panel-left").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
});

$(".panel-top").resizable({
    handleSelector: ".splitter-horizontal",
    resizeWidth: false
});

function changeLayout() {
    var bottom = $('.panel-bottom');
    var scroll = $('#table-responsive');
    var preview = $('#preview');
    var image = $('.img-fluid');
    var w = $(window).height();

    if ($('#buildMode').hasClass('active')) {
        var top = $('.panel-top').height();
        var scrollHeight = top - 119.31;
        var imageHeight = top - 39;
        var bottomHeight = (w - top) - 61.63;


        $('.toggleOff').css('display','');
        $('.toggleOffTake').css('display','');
        $('.panel-top').css('max-height', '90vh');
        scroll.css('height', scrollHeight);
        preview.css('height', imageHeight);
        image.css('max-height', imageHeight);
        bottom.css('height', bottomHeight);
        $('[href="#NewTemplate"]').trigger('click');
    }

    if ($('#proofMode').hasClass('active')) {
        var proofScrollHeight = w - 51.63;


        $('.toggleOff').css('display','none');
        $('.toggleOffTake').css('display','none');
        $('.panel-top').css('max-height', '100vh');
        $('.panel-top').css('height', proofScrollHeight);
        scroll.css('height', proofScrollHeight);
        preview.css('height', proofScrollHeight);
        image.css('max-height', proofScrollHeight);
    }

    if ($('#playMode').hasClass('active')) {
        var playScrollHeight = w - 51.63 - 39 - 77.31;
        var playPreviewHeight = w - 51.63 - 39;
        var playTopHeight = w - 51.63;

        $('.toggleOff').css('display','none');
        $('.toggleOffTake').css('display','');
        $('.panel-top').css('max-height', '100vh');
        $('.panel-top').css('height', playTopHeight);
        scroll.css('height', playScrollHeight);
        preview.css('height', playPreviewHeight);
        image.css('max-height', playScrollHeight);
        $('[href="#ClockControl"]').trigger('click');
    }
}

$(document).ready(function() {
    $('#buildMode').addClass("active");
    buildLayout();
});

$(window).resize(function(){
    changeLayout();
});

$(function() {
    $("#layout").children().click(function() {
        // remove classes from all
        $("#layout").children().removeClass("active");
        // add class to the one we clicked
        $(this).addClass("active");

        if ($('#buildMode').hasClass("active")) {
            buildLayout();
        }

        changeLayout();
    });
});

function buildLayout() {
    var bottom = $('.panel-bottom');
    var scroll = $('#table-responsive');
    var preview = $('#preview');
    var image = $('.img-fluid');
    var w = $(window).height();
    var ww = $(window).width();
    var top = w/2;

    var scrollHeight = top - 119.31;
    var imageHeight = top - 39;
    var bottomHeight = (w - top) - 61.63;
    var imageWidth = (ww - (imageHeight / 9) * 16) -10 ;

    $('.panel-top').css('height', top);
    scroll.css('height', scrollHeight);
    preview.css('height', imageHeight);
    image.css('max-height', imageHeight);
    bottom.css('height', bottomHeight);

    $('.panel-left').css('width', imageWidth);
}

// Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

$('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
})

$('#tooltips').click(function(){
    if($('#tooltips').prop("checked") == true){
        $('[data-toggle="tooltip"]').tooltip('enable');
    }
    else if($('#tooltips').prop("checked") == false){
        $('[data-toggle="tooltip"]').tooltip('disable');
    }
});


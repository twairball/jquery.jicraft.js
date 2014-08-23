
// ;(function ( $ ) {
 
//     $.fn.jicraft_gallery = function( options ) {
 
//         // This is the easiest way to have default options.
//         var settings = $.extend({
//             // These are the defaults.
//             template: '#jicraft-collection-template', 
//             collectionUrl: 'http://jicraft.com/collections/down-jackets-fw14.json'
//         }, options );
 
//         // jicraft_gallery the collection based on the settings variable.
//         return this.each(function() {
//             $(this).attr('jicraft',settings.collectionUrl);
//             // console.log('hello: ' + settings.collectionUrl);
//         });
//     };
 
// }( jQuery ));





;(function($) {

    // jicraft_gallery instantiator
    $.fn.jicraft_gallery = function( options ) {
        
        var _jicraft_gallery = new $.jicraft(this, options);
 
        // jicraft_gallery the collection based on the settings variable.
        return this.each(function() {
            $(this).attr('jicraft',_jicraft_gallery.collectionUrl());
            var _jicraft_gallery = new $.jicraft($(this), options);
        });
    };

    // jicraft class def
    $.jicraft = function(el, options) {

        var base = this; // this guy

        // options etc
        var defaults = {
            template: '#jicraft-collection-template', 
            // collectionUrl: 'http://jicraft.com/collections/down-jackets-fw14.json'
            collectionUrl: 'http://localhost:3000/collections/yan-ping-lu-album.json'
        };

        var init = function() {
            base.settings = $.extend({}, defaults, options);
            base.el = el;
            base.data = {hello: 'world'};
            base.fetch_json

            // code goes here
        }

        base.fetch_json = function() {
            if (!base.settings.collectionUrl) {
                console.log("request url not initiated");
                return false;
            }

            $.ajax({
                url: base.settings.collectionUrl,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                accept: 'application/json',
                dataType: 'json',
                crossDomain: true
            })
            .done(
                function(data) {
                    console.log('fetch_json done');
                    base.data = data;
                    base.reload();
                }
            )
            .fail( function(xhr, status, errorThrown) {
                console.log("ajax fail:  " + xhr.responseText);
                console.log("   status: " + status + ", errorThrown: " + errorThrown);
            }); 
        }

        base.reload = function() {
            var data = base.data;

            if (!data) {
                console.log('data is nil');
                return false;
            }
            
            console.log("reload...");
            console.log("   title:" + data.title);
            data.items.forEach( function(item) {
                console.log("==> item: "+ item.id);
                item.photos.forEach( function(photo) {
                    console.log("=====> photo: " + photo.image_url)
                });
                console.log("==> ** append section: " + base.append_section(item));
            });
        }

        base.append_section = function(item) {
            // var section_node = $('.template .section').first().clone();
            var template_node = $(base.settings.template).first().clone();

            if (item.photos.length > 0 ) {
                // item photo
                var img_url = item.photos[0].image_url;
                console.log("[append_section] img_url: " + img_url);
                var img_tag = template_node.find('img.jicraft-img')[0];
                img_tag.src = img_url;

                // item title
                var title_tag = template_node.find('.jicraft-item-title').first();
                if(item.title) {
                    title_tag.text(item.title);
                } else {
                    title_tag.text('item-'+item.id);
                }
                
                base.el.append(template_node);

                return true;
            } else {
                return false;
            }
        }

        base.collectionUrl = function () {
            return base.settings.collectionUrl;
        }

        // init
        init();
    }

})(jQuery);



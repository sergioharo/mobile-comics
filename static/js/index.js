(function() {
    
    var ComicSelection = {
        comics: [],
        
        Has: function (id) {
            return (this.comics.indexOf(id) !== -1);
        },
        
        IndexOf: function (id) {
            return (this.comics.indexOf(id));
        },
        
        Add: function (id) {
            if (this.Has(id))
                return false;
            this.comics.push(id);
            return true;
        },
        
        Remove: function (id) {
            var index = this.IndexOf(id);
            if(index === -1)
                return false;
            this.comics.splice(index, 1);
            return true;
        },
        
        Clear: function () {
            this.comics = [];
        }
    };
    
    var ComicOptions = {
        comics: [],
        
        state: {
            hasRenderedOptions: false
        },
        
        Set: function (comics) {
            this.comics = comics;
        },
        
        Clear: function() {
            this.comics = [];
            this.ClearView();
        },
        
        ClearView: function () {
            $("#options div[data-role='content']").empty();
        },
        
        RenderAll: function () {
            var html = "<form action='#' method='get'><div  data-role='fieldcontain'><fieldset data-role='controlgroup'>";
            for(var i = 0, len = this.comics.length; i < len; ++i) {
                var comic = this.comics[i];
                html += this.RenderSingle(comic);
            }
            html += "</fieldset></div></form>";

            $("#options div[data-role='content']")
                .empty()
                .append(html)
                .find("input")
                    .checkboxradio();
                    
            this.state.hasRenderedOptions = true;        
            this.SetOptionsToDefault();
        },
        
        RenderSingle: function (comic) {
            var name = "checkbox-" + comic.id;
            var text = '<input type="checkbox" name="' + name + '" id="' + name + '" class="custom" value="' + comic.id + '" /> ';
            text += '<label for="' + name + '">' + comic.name + '</label>';
            return text;
        },
        
        SetOptionsToDefault: function () {
            var all_inputs = $("#options div[data-role='content'] input");
            all_inputs.attr('checked', false);
            for(var i = 0, len = ComicSelection.comics.length; i < len; ++i) {
                var id = "#checkbox-" + ComicSelection.comics[i];
                $(id).attr('checked', true);
            }
            all_inputs.checkboxradio('refresh');
        }
    };
    
    var ComicsView = {
        comics: {},
        
        Has: function (id) {
            if (this.comics[id])
                return true;
            return false;
        },
        
        Get: function (id) {
            return this.comics[id];
        },
        
        Merge: function(comics) {
            for(var i = 0, len = comics.length; i < len; ++i) {
                var comic = comics[i];
                if (this.comics[comic.id])
                    return;
                    
                this.comics[comic.id] = {
                    id: comic.id,
                    name: comic.name,
                    author: comic.author,
                    last_comic: comic.last_comic,
                    current_comic: comic.last_comic,
                    strips: {  }
                };
                
                this.comics[comic.id].strips[comic.last_comic] = comic.img_src;
                
            }
        },
        
        Clear: function() {
            this.comics = {};
            this.ClearView();
        },
        
        ClearView: function () {
            $("#home div[data-role='content']").empty();
        },
        
        AddStrip: function(comic) {
            if (!this.comics[comic.id])
                return;
                
            var comic = this.comics[comic.id];
            comic.strips[comic.strip_id] = comic.img_src
        },
        
        RenderAll: function() {
            var html = "";
            for(var i = 0, len = ComicSelection.comics.length; i < len; ++i) {
                var comic = this.comics[ComicSelection.comics[i]];
                html += this.RenderSingle(comic);
            }
            $("#home div[data-role='content']").empty().append(html);
        },
        
        RenderSingle: function (comic) {
            var html;
            html = "<div class='comic'>"
                 +     "<div class='comic-info'>"
                 +         "<div class='comic-name'>" + comic.name + "</div>"
                 +         "<div class='comic-author'>" + comic.author + "</div>"
                 +      "</div>"
                 +     "<div class='comic-icontainer'>"
                 +         "<img src='" + comic.strips[comic.current_comic] + "' />"
                 +      "</div>"
                 +  "</div>";
            return html;
        }
    }
    
    var Controller = {
        
        ////////////////////////////////
        // Local Storage
        ////////////////////////////////
        SaveToStorage: function () {
            localStorage['comics'] = JSON.stringify(ComicSelection.comics);
        },
        
        GetFromStorage: function () {
            if(localStorage['comics'])
                ComicSelection.comics = JSON.parse(localStorage['comics']);
        },
        
        ////////////////////////////////
        // Options
        ////////////////////////////////
        
        SaveOptions: function () {
            var options = $("#options div[data-role='content'] input:checked");
            var comics = [];
            for(var i = 0, len = options.length; i < len; ++i) {
                var id = parseInt(options.eq(i).val());
                comics.push(id);
            }
            ComicSelection.comics = comics;
            Controller.SaveToStorage();
            Controller.UpdateComics();
        },
        
        ShowOptions: function () {
            if (!ComicOptions.state.hasRenderedOptions) {
                $.getJSON('/comics/list/', function(data) { 
                    ComicOptions.Set(data.comics);
                    ComicOptions.RenderAll();
                });
            }
            else {
                ComicOptions.SetOptionsToDefault();
            }
        },
        
        ////////////////////////////////
        // View
        ////////////////////////////////
        UpdateComics: function () {
            if(ComicSelection.comics.length === 0) {
                ComicsView.ClearView();
                return;
            }
            var needed_comics = [];
            for(var i = 0, len = ComicSelection.comics.length; i < len; ++i) {
                var id = ComicSelection.comics[i];
                if (!ComicsView.Has(id))
                    needed_comics.push(id);
            }
            
            if(needed_comics.length > 0) {
                $.ajax({
                    url: '/comics/get/',
                    type: 'POST',
                    data: JSON.stringify({ comics: needed_comics}),
                    contentType: "application/json",
                    success: function(data) {
                        ComicsView.Merge(data.comics);
                        ComicsView.RenderAll();
                    }
                });
            } else {
                ComicsView.RenderAll();
            }
            
        }
    }
    
    // show init behavior
    Controller.GetFromStorage();
    
    // setup listeners
    $("#options").live('pagebeforeshow', Controller.ShowOptions);
    $("#optionsSaveBtn").click(Controller.SaveOptions)
    
    Controller.UpdateComics();
    
})();
/*******************************************************************************
// Models
********************************************************************************/
Ext.ns('Comics');

Ext.regModel('ShortComic', {
    fields: ['name', 'id']
});

Ext.regModel('Comic', {
    fields: ['name', 'author', 'num_entries', 'id', 'img_url']
});

var state = {
    hasLoadedOptions: false
}

var OptionList = new Ext.data.Store({
    model: 'ShortComic',
    proxy: {
        type: 'ajax',
        url : '/comics/list/',
        reader: {
            type: 'json',
            root: 'comics'
        }
    }
});

/*******************************************************************************
// Universal UI
********************************************************************************/
Comics.UniversalUI = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    items: [{
        cls: 'launchscreen',
        html: '<div><h1>Welcome to Sencha Touch</h1><p>This is a comprehensive collection of our examples in an <br /> easy-to-navigate format. Each sample has a “view source” button which dynamically displays its associated code.<br /><br /><span>Sencha Touch (' + Ext.version +')</span></p></div>'
    }],
    useTitleAsBackText: false,
    
    initComponent : function() {
        
        ///////////////////////////////////////
        // Set up nav buttons
        ///////////////////////////////////////
        this.settingsButton = new Ext.Button({
            hidden: false,
            iconCls: 'settings',
            iconMask: true,
            //text: 'Settings',
            handler: this.onSettingsButtonTap,
            scope: this
        });

        this.backButton = new Ext.Button({
            text: 'Back',
            ui: 'back',
            handler: this.onBackButtonTap,
            hidden: true,
            scope: this
        });
        
        var btns = [{xtype: 'spacer'}, this.settingsButton];
        
        if (Ext.is.Phone) {
            btns.unshift(this.backButton);
        }
        
        ///////////////////////////////////////
        // Set up nav bar
        ///////////////////////////////////////
        this.navigationBar = new Ext.Toolbar({
            ui: 'dark',
            dock: 'top',
            title: this.title,
            items: btns.concat(this.buttons || [])
        });
        
        ///////////////////////////////////////
        // Set options list
        ///////////////////////////////////////
        
        this.optionsPanel = new Ext.Panel({
            autoHeight:true,
            layout:'fit',
            useToolbar: false,
            updateTitleText: false,
            hidden: !Ext.is.Phone,
            
            items: new Ext.List({
                store: OptionList,
                itemTpl : '{name}',
                listeners: {
                    itemtap: this.onNavPanelItemTap,
                    scope: this
                }
            })
        });

        if (!Ext.is.Phone) {
            this.optionsPanel.setWidth(300);
        }

        ///////////////////////////////////////
        // Final Setup
        ///////////////////////////////////////
        /*if (Ext.is.Phone) {
            this.items = this.items || [];
            this.items.push(this.navigationPanel);
        }*/
        
        this.dockedItems = this.dockedItems || [];
        this.dockedItems.unshift(this.navigationBar);

        Comics.UniversalUI.superclass.initComponent.call(this);
    },

    /***************************************
    // Button Listeners
    ***************************************/
    
    toggleButtons: function() {
        var optPnl = this.optionsPanel;

        if (Ext.is.Phone) {
            if (this.getActiveItem() === optPnl) {
                this.backButton.show();
                this.settingsButton.hide();
            } else {
                this.backButton.hide();
                this.settingsButton.show();
            }
            this.navigationBar.doLayout();
        }
    },

    onBackButtonTap: function() {
        var optPnl = this.optionsPanel;

        // if we already in the nested list
        if (this.getActiveItem() === optPnl) {
            this.setActiveItem(this.lastActiveItem, 'flip');
            this.lastActiveItem = null;
        }
        this.toggleButtons();
    },

    onSettingsButtonTap : function() {
        if(!state.hasLoadedOptions) {
            OptionList.load();
            state.hasLoadedOptions = true;
        }
        if(Ext.is.Phone) {
            this.lastActiveItem = this.getActiveItem();
            this.setActiveItem(this.optionsPanel, 'flip');
        } else {
            this.optionsPanel.showBy(this.settingsButton, 'fade');
        }
        this.toggleButtons();
    },
    
    /***************************************
    // List Listeners
    ***************************************/
    onNavPanelItemTap: function(subList, subIdx, el, e) {
        var store      = subList.getStore(),
            record     = store.getAt(subIdx),
            recordNode = record.node,
            nestedList = this.optionsPanel,
            title      = nestedList.renderTitleText(recordNode),
            card, preventHide, anim;

        if (record) {
            card        = record.get('card');
            anim        = record.get('cardSwitchAnimation');
            preventHide = record.get('preventHide');
        }
    },

    /***************************************
    // Layout handling
    ***************************************/
    layoutOrientation : function(orientation, w, h) {
        if (!Ext.is.Phone) {
            this.optionsPanel.hide(false);
            this.removeDocked(this.optionsPanel, false);
            if (this.optionsPanel.rendered) {
                this.optionsPanel.el.appendTo(document.body);
            }
            this.optionsPanel.setFloating(true);
            this.optionsPanel.setHeight(600);
            this.navigationBar.doComponentLayout();
        }

        Comics.UniversalUI.superclass.layoutOrientation.call(this, orientation, w, h);
    }
});

/*******************************************************************************
// Init
*******************************************************************************/

Comics.Main = {
    init: function () {
        this.ui = new Comics.UniversalUI({
                    title: 'Comics',
                });
    }
};

Ext.setup({
    tabletStartupScreen: '/static/img/tablet_startup.png',
    phoneStartupScreen: '/static/img/phone_startup.png',
    icon: '/static/img/icon.png',
    glossOnIcon: false,

    onReady: function() {
        Comics.Main.init();
    }
});

/*(function() {
    
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
    
})();*/
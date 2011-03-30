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

var Controller = {
    state: {
        hasLoadedOptions: false
    },
    
    onOptionsSync: function(options) {
        var comics = [];
        if(options.create) {
            for(var i = 0, len = options.create.length; i < len; ++i) {
                var id = options.create[i].getId();
                comics.push(id);
            }
        }
        
        if(comics.length > 0) {
            var operation = new Ext.data.Operation({
                action: 'read',
                addRecords: true,
                filters: [
                    {
                        needed_comics: comics
                    }
                ]
            });

            ComicsStore.read(operation);
        }
        
        if(options.destroy)
            ComicsStore.filter();  
        return true;
    }
};

var MyOptions = new Ext.data.Store({
    model: 'ShortComic',
    autoLoad: true,
    listeners: {
        beforesync: Controller.onOptionsSync,
        scope: Controller
    },
    proxy: {
        type: 'localstorage',
        id: 'hb-selected-comics'
    },
    getIdsAsArray: function () {
        var selectedComics = [];
        this.each(function(record) {
            selectedComics.push(record.getId());
        });
        return selectedComics;
    }
});

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

var ComicsStore = new Ext.data.Store({
    model: 'Comic',
    autoLoad: true,
    filters: [
        {
            filterFn: function (item) {
                var rec = MyOptions.getById(item.getId());
                return (rec? true: false);
            }
        }
    ],
    proxy: {
        type: 'ajax',
        url : '/comics/get/',
        filterParam: 'data',
        limitParam: undefined,
        reader: {
            type: 'json',
            root: 'comics'
        },
        encodeFilters: function(filters) {
            var needed_comics = [];
            for(var i = 0, len = filters.length; i < len; ++i) {
                if(filters[i].needed_comics)
                    needed_comics = needed_comics.concat(filters[i].needed_comics)
            }
            if (needed_comics.length == 0)
                needed_comics = MyOptions.getIdsAsArray();
                
            if (needed_comics.length == 0)
                return '';
            else
                return JSON.stringify({comics: needed_comics});
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
        
        this.optionsList = new Ext.List({
            store: OptionList,
            simpleSelect: true,
            itemTpl : '{name}',
            listeners: {
                select: this.onOptionSelected,
                deselect: this.onOptionDeselected,
                deactivate: this.onOptionsHidden,
                update: this.onOptionsReady,
                scope: this
            }
        });
        
        this.optionsPanel = new Ext.Panel({
            autoHeight:true,
            layout:'fit',
            useToolbar: false,
            updateTitleText: false,
            hidden: !Ext.is.Phone,
            items: this.optionsList,
            listeners: {
                hide: this.onOptionsHidden,
                scope: this
            }
        });

        if (!Ext.is.Phone) {
            this.optionsPanel.setWidth(300);
        }
        
        ///////////////////////////////////////
        // Setup view
        ///////////////////////////////////////
        this.mainPanel = new Ext.Panel({
            autoHeight: true,
            autoWidth: true,
            layout: 'fit',
            useToolbar: false,
            updateTitleText: false,
            hidden: false,
            items: new Ext.List({
                store: ComicsStore,
                disableSelection : true,
                pressedCls: '',
                cls: 'comic',
                itemTpl : '<div class="comic-info">                 \
                            <div class="comic-name">{name}</div>    \
                            <div class="comic-author">{author}</div>\
                        </div>                                      \
                        <div class="comic-icontainer">              \
                            <img src="{img_url}" />                 \
                        </div>'
            })
        });
        
        this.items = this.Items || [];
        this.items.unshift(this.mainPanel);
        
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

        if (this.getActiveItem() === optPnl) {
            this.setActiveItem(this.lastActiveItem, 'flip');
            this.lastActiveItem = null;
            this.onOptionsHidden();
        }
        this.toggleButtons();
    },

    onSettingsButtonTap : function() {
        if(!Controller.state.hasLoadedOptions) {
            OptionList.load();
            Controller.state.hasLoadedOptions = true;
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
    onOptionSelected: function(selectionModel, record) {
        MyOptions.add(record.data);
    },

    onOptionDeselected: function(selectionModel, record) {
        var rec = MyOptions.getById(record.getId());
        MyOptions.remove(rec);
    },
    
    onOptionsHidden: function() {
        MyOptions.sync();
    },
    
    onOptionsReady: function() {
        var model = this.optionsList.getSelectionModel();
        MyOptions.each(function(record) {
           var rec  = OptionList.getById(record.getId());
           if(rec)
            model.select(rec, true, true);
        });
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
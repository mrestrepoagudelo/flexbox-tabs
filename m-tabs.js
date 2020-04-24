var m_tabs = {

    render_tabs:function(){
        this.render();
    },
    
    render:function(){
        var me = this;
        var tabsMain = document.querySelectorAll(".m-tabs");
        for(var i=0; i < tabsMain.length; i++){
             var tabMain = tabsMain[i];
             me.renderTabMain(tabMain);
        }
    },

    renderContent:function(elementContent){
        var me = this;
        var tabsMain = elementContent.querySelectorAll(".m-tabs");
        for(var i=0; i < tabsMain.length; i++){
             var tabMain = tabsMain[i];
             me.renderTabMain(tabMain);
        }
    },

    renderTabMain:function(tabMain){
        var me = this;
        
        //crear el tab-header
        var tabHeader = document.createElement("div");
        tabHeader.className = "m-tabs-header";

        //obtener los tab, son los hijos del tabMain
        var tabsContent = tabMain.children;
        for(var i=0; i < tabsContent.length; i++){
            var tabChild = tabsContent[i];
            
            //crear el elemento div donde iran el title y el icon close
            var textTitle = tabChild.getAttribute("tab-title");
            var tabTitle = document.createElement("div");
            tabTitle.className = "m-tab-title";
            tabTitle.textContent = textTitle;
            tabTitle.addEventListener('click',function(event){
            	me.openTab(this);
            });

            //si tiene la clase tab-close, se crea el icon close
            if(tabChild.classList.contains("tab-close")){
                //crear el elemento icon close
                var close = document.createElement("div");
                close.className = "tab-close";
                close.addEventListener('click',function(e){
                	me.closeTab(this);
                	e.stopPropagation();
                });
                tabTitle.appendChild(close);
            }

            $(tabTitle).data().tab = tabChild;
           
            //se selecciona el primer tab por defecto
            if(i==0){
                tabTitle.classList.add("tab-title-selected");
                tabChild.classList.add("m-tab-selected");
            }
            tabHeader.appendChild(tabTitle);
        }

        tabMain.appendChild(tabHeader);
    },
    
    getTab:function(tabMain,title){
    	var me = this;
    	const tabH = Array.from(tabMain[0].children).filter(function(element){
            return element.classList.contains("m-tabs-header");
        });
        
        var tabTitle = null;
        var arrayElements = Array.from(tabH[0].children);
        for(var i = 0; i < arrayElements.length; i++){
        	var element = arrayElements[i];
        	if(element.textContent == title){
        		tabTitle = element;
	       	}
        }
       
        return tabTitle;
    },
    
    selectTab:function(tabMain,index){
    	var me = this;
    	const tabH = Array.from(tabMain[0].children).filter(function(element){
            return element.classList.contains("m-tabs-header");
        });
    	tabH[0].children[index].click();
    },

    createTab:function(tabMain,options){
        var me = this;
        
        //console.time('loop3');
        const tabH = Array.from(tabMain.children).filter(function(element){
            return element.classList.contains("m-tabs-header");
        });
        //console.timeEnd('loop3');
        var tabHeader = tabH[0];

        //si no existe el tab-header lo creamos
        if(!tabHeader){
            tabHeader = document.createElement("div");
            tabHeader.className = "m-tabs-header";
            tabMain.appendChild(tabHeader);
        }
        
        //crear el elemento tab
        var tab = document.createElement("div");
        tab.className = "m-tab";
        tab.innerHTML = options.content;

        //crear el elemento tab-title donde iran el title y el icon close
        var tabTitle = document.createElement("div");
        tabTitle.className = "m-tab-title";
        tabTitle.textContent = options.title;
        tabTitle.addEventListener('click',function(event){
        	me.openTab(this);
        });
        
        //crear el icon close
        if(options.close){
            var title = document.createElement("div");
            title.className = "tab-close";
            title.addEventListener('click',function(e){
            	me.closeTab(this);
            	e.stopPropagation();
            });
            tabTitle.appendChild(title);
        }

        $(tabTitle).data().tab = tab;
        tabHeader.appendChild(tabTitle);
        tabMain.appendChild(tab);  

        options.render = true;
        if(options.render){
            me.renderContent(tab);
        }
        
        //seleccionar el tab
        tabTitle.click();
        return tab;
    },

    closeTab:function(tabHeader){
        var contTabTitle = tabHeader.parentElement.parentElement;

        //eliminar el tab-title
        tabHeader.parentElement.remove();

        //eliminar el tab
        $(tabHeader.parentElement).data("tab").remove();
        
        //si el tab-title estaba seleccoinado, toca seleccionar el primer tab-title
        if(tabHeader.parentElement.classList.contains("tab-title-selected")){
        	
            if(contTabTitle.children.length > 0){
                contTabTitle.firstChild.click();
            }                         
        }
    },

    openTab:function(tabHeader){
        var me = this;
        var tieneClass = $(tabHeader).hasClass("tab-title-selected");
        var contTabTitle = $(tabHeader).parent();
        var contTabs = contTabTitle.parent();

        if(!tieneClass){
            contTabTitle.children().removeClass("tab-title-selected");
            contTabs.children().removeClass("m-tab-selected");
    
            //seleccionar el tab-title
            $(tabHeader).addClass('tab-title-selected');
            
            //mostrar el tab 
            $(tabHeader).data("tab").classList.add("m-tab-selected");
        }
    },
    addEvents:function(){
        var me = this;
        $(".m-tabs-header").on("click",function(e){
        	console.log(e.target);
            if($(e.target).hasClass("m-tab-title")){
                me.openTab(e.target);
            }
            if($(e.target).hasClass("tab-close")){
                me.closeTab(e.target);
                e.stopPropagation();
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
	m_tabs.render_tabs();
});

function createNewTab(){
    var tabMain = document.querySelector("#tabMain");
    m_tabs.createTab(tabMain,{
        title:"New Tab",
        close:true,
        content:"<p>Content New Tab</p>"
    });
}
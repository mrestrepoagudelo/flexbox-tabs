<h1> Tabs Flexbox </h1>
Tabs made with flexbox and javascript

Example available at https://mrestrepoagudelo.github.io/flexbox-tabs/

<h3>Include Layout Flexbox CSS:</h4>

```html
  <link rel="stylesheet" type="text/css" href="m-tabs.css">
  <script type="text/javascript" src="jquery.min.js"></script>
  <script type="text/javascript" src="m-tabs.js"></script>
```

<h3>Example:</h4>

```html
<div class="m-tabs" id="tabMain" style="width: 700px; height: 500px;">
    <div class="m-tab" tab-title="Tab 1">
        <p>Content Tab 1</p>
    </div>
  
    <div class="m-tab tab-close" tab-title="Tab 2">
        <p>Content Tab 2</p>
    </div>

    <div class="m-tab" tab-title="Tab 3">
        <p>Content Tab 3</p>
    </div>
</div>
```


<h3>CSS Classes:</h4>

`m-tabs` <br>
class for main tab<br>

`m-tab` <br>
Class to tabs<br>

`tab-close` <br>
Class to enable the close icon of tab<br><br>

<h3>Create tab with javascript:</h4>

```javascript
function createNewTab(){
    var tabMain = document.querySelector("#tabMain");
    m_tabs.createTab(tabMain,{
        title:"New Tab",
        close:true,
        content:"<p>Content New Tab</p>"
    });
}
```

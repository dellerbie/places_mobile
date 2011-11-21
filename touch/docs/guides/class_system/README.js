Ext.data.JsonP.class_system({"title":"The Class System","guide":"<h1>How to use classes in Sencha Touch 2</h1>\n\n<p>Sencha Touch 2 uses the state of the art class system developed for Ext JS 4. It makes it easy to create new classes in JavaScript, providing inheritance, dependency loading, mixins, powerful configuration options, and lots more.</p>\n\n<p>At its simplest, a class is just an object with some functions and properties attached to it. For instance, here's a class for an animal, recording its name and a function that makes it speak:</p>\n\n<pre><code>Ext.define('Animal', {\n    config: {\n        name: null\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n    },\n\n    speak: function() {\n        alert('grunt');\n    }\n});\n</code></pre>\n\n<p>We now have a class called <code>Animal</code>, where each animal can have a name and speak. To create a new instance of animal, we just use Ext.create:</p>\n\n<pre><code>var bob = Ext.create('Animal', {\n    name: 'Bob'\n});\n\nbob.speak(); //alerts 'grunt'\n</code></pre>\n\n<p>Here we created an Animal called Bob and commanded it to speak. Now that we've created a class and instantiated it, we can start improving what we have. At the moment we don't know Bob's species, so let's clear that up with a <code>Human</code> subclass:</p>\n\n<pre><code>Ext.define('Human', {\n    extend: 'Animal',\n\n    speak: function() {\n        alert(this.getName());\n    }\n});\n</code></pre>\n\n<p>Now we've got a new class that inherits from Animal, therefore gaining all of its functions and configurations. We actually overrode the speak function because most humans are smart enough to say their name instead of grunt. Now, let's make Bob a human:</p>\n\n<pre><code>var bob = Ext.create('Human', {\n    name: 'Bob'\n});\n\nbob.speak(); //alerts 'Bob'\n</code></pre>\n\n<p>We used a magical function when adding the Human subclass. You'll notice that we didn't actually define a getName function on our Animal class, so where did it come from? Part of the class system is the ability to give classes configuration options, which each automatically give you the following:</p>\n\n<ul>\n<li>a getter function that returns the current value, in this case <code>getName()</code>.</li>\n<li>a setter function that sets a new value, in this case <code>setName()</code>.</li>\n<li>an applier function called by the setter that lets you run a function when a configuration changes, in this case <code>applyName()</code>.</li>\n</ul>\n\n\n<p>The getter and setter functions are generated for free and are the recommended way to store data in a class. Every component in Sencha Touch uses the class system and the generated functions always follow the same pattern so if you know a config you already know how to get and set its value.</p>\n\n<p>It also makes your code cleaner. For example, if you wanted to always ask the user if she really wants to change Bob's name, you can just define an <code>applyName</code> function that will automatically be called:</p>\n\n<pre><code>Ext.define('Human', {\n    extend: 'Animal',\n\n    applyName: function(newName, oldName) {\n        return confirm('Are you sure you want to change name to ' + newName + '?');\n    }\n});\n</code></pre>\n\n<p>We're just using the browser's built in confirm function, which opens a dialog asking the user the question and offering \"Yes\" and \"No\" as answers. The applier functions allow you to cancel the name change if you return false. As it happens the confirm function will return true or false depending on whether the user clicks Yes or No.</p>\n\n<p>If we make a new Bob and try to change his name, but then click No when prompted, his name won't change after all:</p>\n\n<pre><code>var bob = Ext.create('Person', {\n    name: 'Bob'\n});\n\nbob.setName('Fred'); //opens a confirm box, but we click No\n\nbob.speak(); //still alerts 'Bob'\n</code></pre>\n\n<p>We've basically already learned the important parts of classes, as follows:</p>\n\n<ul>\n<li>All classes are defined using <code>Ext.define</code>, including your own classes</li>\n<li>Most classes extend another class, using the <code>extend</code> syntax</li>\n<li>Classes are created using <code>Ext.create</code>, for example <code>Ext.create('SomeClass', {some: 'configuration'})</code></li>\n<li>Always usine the <code>config</code> syntax to get automatic getters and setters and have a much cleaner codebase</li>\n</ul>\n\n\n<p>At this point you can already go about creating classes in your app, but the class system takes care of a few more things that will be helpful to lear are a few other things the class system does.</p>\n\n<h2>Dependencies and Dynamic Loading</h2>\n\n<p>Most of the time, classes depend on other classes. The Human class above depends on the Animal class because it extends it - we depend on Animal being present to be able to define Animal. Sometimes you'll make use of other classes inside a class, so you need to guarantee that those classes are on the page. Do this with the <code>requires</code> syntax:</p>\n\n<pre><code>Ext.define('Human', {\n    extend: 'Animal',\n\n    requires: 'Ext.MessageBox',\n\n    speak: function() {\n        Ext.Msg.alert(this.getName(), \"Speaks...\");\n    }\n});\n</code></pre>\n\n<p>When you create a class in this way, Sencha Touch checks to see if <code>Ext.MessageBox</code> is already loaded and if not, loads the required class file immediately with AJAX.</p>\n\n<p><code>Ext.MessageBox</code> itself may also have classes it depends on, which are then also loaded automatically in the background. Once all the required classes are loaded, the Human class is defined and you can start using <code>Ext.create</code> to instantiate people. This works well in development mode as it means you don't have to manage the loading of all your scripts yourself, but not as well in production because loading files one by one over an internet connection is rather slow.</p>\n\n<p>In production, we really want to load just one JavaScript file, ideally containing only the classes that our application actually uses. This is really easy in Sencha Touch 2 using the JSBuilder tool, which analyzes your app and creates a single file build that contains all of your classes and only the framework classes your app actually uses. See part 2 of the Getting Started guide for details on how to use the JSBuilder.</p>\n\n<p>Each approach has its own pros and cons, but can we have the good parts of both without the bad, too? The answer is yes, and we've implemented the solution in Sencha Touch 2.</p>\n\n<h2>Naming Conventions</h2>\n\n<p>Using consistent naming conventions throughout your code base for classes, namespaces and filenames helps keep your code organized, structured, and readable.</p>\n\n<h3>1) Classes</h3>\n\n<p>Class names may only contain <strong>alphanumeric</strong> characters. Numbers are permitted but are discouraged in most cases, unless they belong to a technical term. Do not use underscores, hyphens, or any other nonalphanumeric character. For example:</p>\n\n<ul>\n<li><code>MyCompany.useful_util.Debug_Toolbar</code> is discouraged</li>\n<li><code>MyCompany.util.Base64</code> is acceptable</li>\n</ul>\n\n\n<p>Class names should be grouped into packages where appropriate and properly namespaced using object property dot notation ( . ). At the minimum, there should be one unique top-level namespace followed by the class name. For example:</p>\n\n<pre><code>MyCompany.data.CoolProxy\nMyCompany.Application\n</code></pre>\n\n<p>The top-level namespaces and the actual class names should be in CamelCase, everything else should be all lower-cased. For example:</p>\n\n<pre><code>MyCompany.form.action.AutoLoad\n</code></pre>\n\n<p>Classes that are not distributed by Sencha should never use <code>Ext</code> as the top-level namespace.</p>\n\n<p>Acronyms should also follow CamelCase convention, for example:</p>\n\n<ul>\n<li><code>Ext.data.JsonProxy</code> instead of <code>Ext.data.JSONProxy</code></li>\n<li><code>MyCompany.util.HtmlParser</code> instead of <code>MyCompary.parser.HTMLParser</code></li>\n<li><code>MyCompany.server.Http</code> instead of <code>MyCompany.server.HTTP</code></li>\n</ul>\n\n\n<h3>2) Source Files</h3>\n\n<p>The names of the classes map directly to the file paths in which they are stored. As a result, there must only be one class per file. For example:</p>\n\n<ul>\n<li><code>Ext.util.Observable</code> is stored in <code>path/to/src/Ext/util/Observable.js</code></li>\n<li><code>Ext.form.action.Submit</code> is stored in <code>path/to/src/Ext/form/action/Submit.js</code></li>\n<li><code>MyCompany.chart.axis.Numeric</code> is stored in <code>path/to/src/MyCompany/chart/axis/Numeric.js</code></li>\n</ul>\n\n\n<p><code>path/to/src</code> is the directory of your application's classes. All classes should stay under this common root and should be properly namespaced for the best development, maintenance, and deployment experience.</p>\n\n<h3>3) Methods and Variables</h3>\n\n<p>Similarly to class names, method and variable names may only contain <strong>alphanumeric</strong> characters. Numbers are permitted but are discouraged in most cases, unless they belong to a technical term. Do not use underscores, hyphens, or any other nonalphanumeric character.</p>\n\n<p>Method and variable names should always use CamelCase. This also applies to acronyms.</p>\n\n<p>Here are a few examples:</p>\n\n<ul>\n<li><p>Acceptable method names:</p>\n\n<pre><code>encodeUsingMd5()\ngetHtml() instead of getHTML()\ngetJsonResponse() instead of getJSONResponse()\nparseXmlContent() instead of parseXMLContent()\n</code></pre></li>\n<li><p>Acceptable variable names:</p>\n\n<pre><code>var isGoodName\nvar base64Encoder\nvar xmlReader\nvar httpServer\n</code></pre></li>\n</ul>\n\n\n<h3>4) Properties</h3>\n\n<p>Class property names follow the same convention as method and variable names, except the case when they are static constants. Static class properties that are constants should be all upper-cased, for example:</p>\n\n<ul>\n<li><code>Ext.MessageBox.YES = \"Yes\"</code></li>\n<li><code>Ext.MessageBox.NO  = \"No\"</code></li>\n<li><code>MyCompany.alien.Math.PI = \"4.13\"</code></li>\n</ul>\n\n\n<h2>Working with classes in Sencha Touch 2.0</h2>\n\n<h3>1. Declaration</h3>\n\n<h4>1.1) The Old Way</h4>\n\n<p>If you've developed with Sencha Touch 1.x, you are certainly familiar with <code>Ext.extend</code> to create a class:</p>\n\n<pre><code>var MyPanel = Ext.extend(Object, { ... });\n</code></pre>\n\n<p>This approach is easy to follow when creating a new class that inherits from another. Other than direct inheritance, however, there wasn't a fluent API for other aspects of class creation, such as configuration, statics, and mixins. We will be reviewing these items in detail shortly.</p>\n\n<p>Let's take a look at another example:</p>\n\n<pre><code>My.cool.Panel = Ext.extend(Ext.Panel, { ... });\n</code></pre>\n\n<p>In this example we want to namespace our new class and make it extend from <code>Ext.Panel</code>. There are two concerns we need to address:</p>\n\n<ol>\n<li><code>My.cool</code> needs to be an existing object before we can assign <code>Panel</code> as its property.</li>\n<li><code>Ext.Panel</code> needs to exist/be loaded on the page before it can be referenced.</li>\n</ol>\n\n\n<p>The first item is usually solved with <code>Ext.namespace</code> (aliased by <code>Ext.ns</code>). This method recursively traverses through the object/property tree and creates them if they don't exist yet. The boring part is you need to remember adding them above <code>Ext.extend</code> all the time, like this:</p>\n\n<pre><code>Ext.ns('My.cool');\nMy.cool.Panel = Ext.extend(Ext.Panel, { ... });\n</code></pre>\n\n<p>The second issue, however, is not easy to address because <code>Ext.Panel</code> might depend on many other classes that it directly/indirectly inherits from, and in turn, these dependencies might depend on other classes to exist. For that reason, applications written before Sencha Touch 2 usually include the whole library in the form of <code>ext-all.js</code> even though they might only need a small portion of the framework.</p>\n\n<h3>1.2) The New Way</h3>\n\n<p>Sencha Touch 2 eliminates all those drawbacks with just one single method you need to remember for class creation: <code>Ext.define</code>. Its basic syntax is as follows:</p>\n\n<pre><code>Ext.define(className, members, onClassCreated);\n</code></pre>\n\n<p>Let's look at each part of this:</p>\n\n<ul>\n<li><code>className</code> is the class name</li>\n<li><code>members</code> is an object represents a collection of class members in key-value pairs</li>\n<li><code>onClassCreated</code> is an optional function callback to be invoked when all dependencies of this class are ready, and the class itself is fully created. Due to the <a href=\"#\">new asynchronous nature</a> of class creation, this callback can be useful in many situations. These will be discussed further in <a href=\"#\">Section IV</a>.</li>\n</ul>\n\n\n<p><strong>Example</strong></p>\n\n<pre><code>Ext.define('My.sample.Person', {\n    name: 'Unknown',\n\n    constructor: function(name) {\n        if (name) {\n            this.name = name;\n        }\n    },\n\n    eat: function(foodType) {\n        alert(this.name + \" is eating: \" + foodType);\n    }\n});\n\nvar aaron = Ext.create('My.sample.Person', 'Aaron');\n    aaron.eat(\"Salad\"); // alert(\"Aaron is eating: Salad\");\n</code></pre>\n\n<p>Note we created a new instance of <code>My.sample.Person</code> using the <code>Ext.create()</code> method.  We could have used the <code>new</code> keyword (<code>new My.sample.Person()</code>). However it is recommended that you always use <code>Ext.create</code> since it allows you to take advantage of dynamic loading. For more info on dynamic loading see the <a href=\"#/guide/getting_started\">Getting Started guide</a></p>\n\n<h3>2. Configuration</h3>\n\n<p>In Sencha Touch 2, we introduce a dedicated <code>config</code> property that is processed by the powerful <code>Ext.Class</code> preprocessors before the class is created. Features include:</p>\n\n<ul>\n<li>Configurations are completely encapsulated from other class members.</li>\n<li>Getter and setter, methods for every config property are automatically generated into the class prototype during class creation if the class does not have these methods already defined.</li>\n<li>An <code>apply</code> method is also generated for every config property.  The auto-generated setter method calls the <code>apply</code> method internally before setting the value.  Override the <code>apply</code> method for a config property if you need to run custom logic before setting the value. If <code>apply</code> does not return a value then the setter will not set the value. For an example see <code>applyTitle</code> below.</li>\n</ul>\n\n\n<p>Here's an example:</p>\n\n<pre><code>Ext.define('My.own.Window', {\n   /** @readonly */\n    isWindow: true,\n\n    config: {\n        title: 'Title Here',\n\n        bottomBar: {\n            enabled: true,\n            height: 50,\n            resizable: false\n        }\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n    },\n\n    applyTitle: function(title) {\n        if (!Ext.isString(title) || title.length === 0) {\n            alert('Error: Title must be a valid non-empty string');\n        }\n        else {\n            return title;\n        }\n    },\n\n    applyBottomBar: function(bottomBar) {\n        if (bottomBar &amp;&amp; bottomBar.enabled) {\n            if (!this.bottomBar) {\n                return Ext.create('My.own.WindowBottomBar', bottomBar);\n            }\n            else {\n                this.bottomBar.setConfig(bottomBar);\n            }\n        }\n    }\n});\n</code></pre>\n\n<p>And here's an example of how it can be used:</p>\n\n<pre><code>var myWindow = Ext.create('My.own.Window', {\n    title: 'Hello World',\n    bottomBar: {\n        height: 60\n    }\n});\n\nalert(myWindow.getTitle()); // alerts \"Hello World\"\n\nmyWindow.setTitle('Something New');\n\nalert(myWindow.getTitle()); // alerts \"Something New\"\n\nmyWindow.setTitle(null); // alerts \"Error: Title must be a valid non-empty string\"\n\nmyWindow.setBottomBar({ height: 100 }); // Bottom bar's height is changed to 100\n</code></pre>\n\n<h3>3. Statics</h3>\n\n<p>Static members can be defined using the <code>statics</code> config, as follows:</p>\n\n<pre><code>Ext.define('Computer', {\n    statics: {\n        instanceCount: 0,\n        factory: function(brand) {\n            // 'this' in static methods refer to the class itself\n            return new this({brand: brand});\n        }\n    },\n\n    config: {\n        brand: null\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        // the 'self' property of an instance refers to its class\n        this.self.instanceCount ++;\n    }\n});\n\nvar dellComputer = Computer.factory('Dell');\nvar appleComputer = Computer.factory('Mac');\n\nalert(appleComputer.getBrand()); // using the auto-generated getter to get the value of a config property. Alerts \"Mac\"\n\nalert(Computer.instanceCount); // Alerts \"2\"\n</code></pre>\n\n<h2>Error Handling and debugging</h2>\n\n<p>Sencha Touch 2 includes some useful features that will help you with debugging and error handling.</p>\n\n<p>You can use <code>Ext.getDisplayName()</code> to get the display name of any method.  This is especially useful for throwing errors that have the class name and method name in their description, such as:</p>\n\n<pre><code>throw new Error('['+ Ext.getDisplayName(arguments.callee) +'] Some message here');\n</code></pre>\n\n<p>When an error is thrown in any method of any class defined using <code>Ext.define()</code>, you should see the method and class names in the call stack if you are using a WebKit based browser (Chrome or Safari). For example, here is what it would look like in Chrome:</p>\n\n<p><p class='screenshot'><img src='guides/class_system/call-stack.png' alt=''><span></span></p></p>\n\n<h2>Further Reading</h2>\n\n<p>Classes are just part of the Sencha Touch 2 ecosystem. To understand more about the framework and how it works, we recommend the following:</p>\n\n<ul>\n<li><a href=\"#!/guide/components\">Components and Containers</a></li>\n<li><a href=\"#!/guide/data\">The Data Package</a></li>\n<li><a href=\"#!/guide/layouts\">The Layout System</a></li>\n<li><a href=\"#!/guide/getting_started\">Getting Started</a></li>\n</ul>\n\n"});
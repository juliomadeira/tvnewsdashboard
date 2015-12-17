# axb-dashboard
This dashboard framework is based on the Polymer Starter Kit, for an easy installation of Polymer and its required libraries.
You can use gulp to execute this framework, but it also includes a PHP connection to MySQL databases, so if you need to use that functionality you will either need to install a PHP plugin on gulp or use Apache or other HTTP/PHP server.

This dashboard also 


#Polymer
Follow the instructions on Polymer Starter Kit github page here: https://github.com/PolymerElements/polymer-starter-kit


#Dashboard Framework
Custom elements implemented:
- combo-chart: Retrieves information using iron-ajax element and builds a combo chart.
- custom-chart: Retrieves information using iron-ajax element and builds a regular chart, e.g.: Pie chart
- custom-feeds: Retrieves RSS and XML feeds using google-feed and builds a custom rss feed web element.
- test-grid: Retrieves data using iron-ajax and builds a custom grid using ag-grid (AngularJS implementation)
- templates: custom page templates, so you keep a clean index.html and can reuse your pages.
- routing: implements Page.js routing, so you can use direct links to any page and use Javascript to change pages.

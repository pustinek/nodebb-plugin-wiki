<!-- IF breadcrumbs.length -->
<ol class="breadcrumb">
    <!-- BEGIN breadcrumbs -->
    <li<!-- IF @last --> component="breadcrumb/current"
        <!-- ENDIF @last --> itemscope="itemscope" itemtype="http://data-vocabulary.org/Breadcrumb"
        <!-- IF @last -->class="active"
        <!-- ENDIF @last -->>
        <!-- IF !@last --><a href="{breadcrumbs.url}" itemprop="url">
            <!-- ENDIF !@last -->
            <!-- IF @first -->
            <i class="fas fa-home"></i>
            <!-- ENDIF @first -->
            <!-- IF !@first -->
            <span itemprop="title">
                {breadcrumbs.text}
            <!-- ENDIF !@first -->
            
                <!-- IF @last -->
                <!-- IF !feeds:disableRSS -->
                <!-- IF rssFeedUrl --><a target="_blank" href="{rssFeedUrl}"><i class="fa fa-rss-square"></i></a><!-- ENDIF rssFeedUrl -->
                <!-- ENDIF !feeds:disableRSS -->
                <!-- ENDIF @last -->
            </span>
            <!-- IF !@last --></a><!-- ENDIF !@last -->
        </li>
        <!-- END breadcrumbs -->
</ol>
<!-- ENDIF breadcrumbs.length -->
<!-- <button class="screen-it-up">FullScreen</button> -->
<span class="js-wiki-warning"></span>
<div class="dogewiki js-wiki-content">
    <div class="dogewiki__sidebar" id="js-dogewiki__sidebar">
    </div>
    <div class="dogewiki__main">
        <div class="dogewiki__main-body" id="dogewiki-content">
        </div>
    </div>
</div>
<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
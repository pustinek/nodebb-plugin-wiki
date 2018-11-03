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



<!-- IMPORT ./partials/breadcrumbs.tpl -->
<div class="dogewiki__row">
    <h1 class="heading-primary">Dogecraft Official Wiki</h1>
    <h2 class="heading-secondary">Click on any core gameplay feature below to learn more about it. </h3>
</div>
<div class="dogewiki">
    <div class="category-container">
        <!-- BEGIN categories -->
        <a href="wiki/{{categories.cid}}" class="js-dogewiki-urlswitch">
            <div class="ndzn-wiki--indexCategory" data-category-key="started">
                <h3 class="category-name">
                    {{categories.title}}
                </h3>
                <p>
                    {{categories.description}}
                </p>
            </div>
        </a>
        <!-- END categories -->
    </div>
</div>
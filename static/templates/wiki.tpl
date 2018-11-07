<div id="plugin-page-wiki-home">
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
    <div class="page-description">
        <h1 class="heading-primary">Dogecraft Official Wiki</h1>
        <h2 class="heading-secondary">Click on any core gameplay feature below to learn more about it. </h3>
    </div>

        <div class="wiki-categories">
            <!-- BEGIN categories -->
            <a href="wiki/{{categories.cid}}" class="js-dogewiki-urlswitch wiki-category__link">
            <div class="wiki-category">
                    <div class="ndzn-wiki--indexCategory" data-category-key="started">
                        <h1 class="wiki-category__title">
                            {{categories.title}}
                        </h1>
                        <h2 class="wiki-category__description">
                            {{categories.description}}
                        </h2>
                    </div>
            </div>
        </a>
            <!-- END categories -->
        </div>
</div>
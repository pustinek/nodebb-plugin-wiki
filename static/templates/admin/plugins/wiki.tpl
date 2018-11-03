<div id="wiki-admin">
	<div class="categories js-sortable-categories">
		<!-- BEGIN categories -->
		<div class="category" data-category-cid="{{categories.cid}}">
			<div class="category__main">
				<div class="category__main-node">
					<div class="category__des">
						Title:
					</div>
					<div class="category__value">
						<span class="category__title js-title">{{categories.title}}</span>
					</div>
				</div>
				<div class="category__main-node">
					<div class="category__des">
						Description:
					</div>
					<div class="category__value">
						<span class="category__description js-description">{{categories.description}}</span>
					</div>
				</div>
				<div class="category__main-node">
					<div class="category__des">
						URL Slug:
					</div>
					<div class="category__value">
						<span class="category__slug js-cid">{{categories.cid}}</span>
					</div>
				</div>
			</div>
			<div class="category__extra">
				<button class="category__delete js-category-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
			</div>
		</div>
		<!-- END categories -->
	</div>
	<div class="category-template hidden" data-category-cid="">
					<div class="category__main">
						<div class="category__main-node">
							<div class="category__des">
								Title:
							</div>
							<div class="category__value">
								<span class="category__title js-title"></span>
							</div>
						</div>
						<div class="category__main-node">
							<div class="category__des">
								Description:
							</div>
							<div class="category__value">
								<span class="category__description js-description"></span>
							</div>
						</div>
						<div class="category__main-node">
							<div class="category__des">
								URL Slug:
							</div>
							<div class="category__value">
								<span class="category__slug js-cid"></span>
							</div>
						</div>
					</div>
					<div class="category__extra">
						<button class="category__delete js-category-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
					</div>
		</div>


	</div>

	<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
		<i class="material-icons">save</i>
	</button>
	<button id="add" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
		<i class="material-icons">add</i>
	</button>
</div>
<div id="wiki-admin__category-add" hidden>
	<form class="wiki-admin__category-add">
		<div class="form-group">
			<input type="text" required name="cid">
			<span class="highlight"></span>
			<span class="bar"></span>
			<label for="input" class="control-label">URL Slug</label><i class="bar"></i>
		</div>
		<div class="form-group">
			<input type="text" required name="title">
			<span class="highlight"></span>
			<span class="bar"></span>
			<label for="input" class="control-label">Title</label><i class="bar"></i>
		</div>
		<div class="form-group">
			<input type="text" required name="description">
			<span class="highlight"></span>
			<span class="bar"></span>
			<label for="input" class="control-label">Description</label><i class="bar"></i>
		</div>
		<div>
			<span class="error-message"></span>
		</div>
	</form>
</div>
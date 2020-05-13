$(document).ready(function(){
	$('#searchUsers').on('keyup', function(e){
		// console.log(e.target.value);
		let username = e.target.value;

		// make request to github	using ajax function 
		$.ajax({
			url: 'https://api.github.com/users/'+username,
			data:{
				client_id:'Your client_id',
				client_secret:'your client_secret'
			}	//The user is what the data is that is been passed in the callback function  
		}).done(function(user){
			// console.log(user);
			$.ajax({
				url: 'https://api.github.com/users/'+username+'/repos',
				data:{
					client_id:'Your client_id',
					client_secret:'your client_secret',
					sort: 'created: asc',
					per_page: 5
				}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repos').append(`
						<div class="well">

							<div class="row">

								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3">
									<span class="badge badge-primary">Folks: ${repo.folks_count}</span>
									<span class="badge badge-warning">Watchers: ${repo.watchers_count}</span>
									<span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
								</div>
							</div>
						</div>

					`);
				});
			});
			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>

				  <div class="panel-body">
				  	<div class="row">
				  		<div class="col-md-3">
				  			<img class="thumbnail avatar" src="${user.avatar_url}">
				  			<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View profile</a>
				  		</div>

				  		<div class="col-md-9">
				  			<span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
							<span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
							<span class="badge badge-success">Followers: ${user.followers}</span>
							<span class="badge badge-dark">Following: ${user.following}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Website/blog: ${user.blog}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member Since: ${user.created_at}</li>
							</ul>
				  		</div>
				  	</div>
				  </div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
			`)
		});
	});
});
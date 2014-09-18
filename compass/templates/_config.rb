#########################
## Compass Configuration
#########################

# Require any additional compass plugins here.
require 'compass/import-once/activate'
<%= compassGems %>

# File system locations
http_path = "<%= httpPath %>"
css_dir = "<%= cssDir %>"
sass_dir = "<%= sassDir %>"
images_dir = "<%= imagesDir %>"
javascripts_dir = "<%= jsDir %>"
fonts_dir = "<%= fontsDir %>"

# You can select your preferred output style here (can be overridden via the command line): One of: :nested, :expanded, :compact, or :compressed
output_style = <%= outputStyle %>

# Determine whether Compass asset helper functions generate relative or absolute paths
relative_assets = <%= relativeAssets %>

# Determine whether debugging comments that display the original location of your selectors will be printed (not needed if Source Maps are enabled).
line_comments = <%= lineComments %>

# Sass Options
<%= optionsPassthrough %>

#########################
## Full documentation:
##   http://compass-style.org/help/documentation/configuration-reference/
#########################

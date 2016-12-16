#' ---
#' title: "My New Figure"
#' description: 
#' author:
#' language:
#' package:
#' plot type:
#' features:
#' ---


new_fig_dir <- "path"
new_fig_name <- "0001-new-fig"

# Replace dummy figure code with your own code
#  *** save your figure object as "p" 
#      and output as PNG for last step ***

# Figure code
pacman::p_load(ggplot2)

p <- ggplot(iris, aes(x = Sepal.Length, y = Sepal.Width)) +
  geom_point()

# Save image of figure:
png(filename = paste0(new_fig_dir,'/',new_fig_name, ".png"), width = 6, height = 5, units='in', res=300)
p
dev.off()

# Create tags and README.md
source('scripts/createSuppFiles.R')
createSuppFiles(new_fig_name, example_type='R-examples')

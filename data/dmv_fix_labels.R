
library(tidyverse)
getwd()
setwd("/Users/abajak/jpmc-capital-flows-dmv/data/")

dmv_graphic_1 = read.csv("dmv-graphic1-data.csv")
glimpse(dmv_graphic_1)

dmv_graphic_1_overall = dmv_graphic_1 %>% 
	dplyr::select(place_geoid, placeOverall1)
glimpse(dmv_graphic_1_overall) # 105

dmv_graphic_labelsfixed = read.csv("dmvgraphiclabelsfixed.csv") %>% 
	select(line, place_geoid, fullcountyname) %>% 
# Add Washington DC
	add_row(line = 4, place_geoid = 11001, fullcountyname = "Washington, DC") %>% 
	select(-line) #%>% 
	#mutate(fullcountyname = gsub("Prince George's County, MD","Prince Georges County, MD", fullcountyname))
glimpse(dmv_graphic_labelsfixed)

# Double check that they've joined properly

dmv_graphic_1_overall %>% 
	anti_join(dmv_graphic_labelsfixed, "place_geoid") %>% 
	glimpse()
dmv_graphic_labelsfixed %>% 
	anti_join(dmv_graphic_1_overall, "place_geoid") %>% 
	glimpse()

# Merge the two and create crosswalk with old and new label

dmv_crosswalk = dmv_graphic_1_overall %>% 
	left_join(dmv_graphic_labelsfixed, "place_geoid") %>% 
	select(-place_geoid) 
glimpse(dmv_crosswalk)
write.csv(dmv_crosswalk, "dmv_crosswalk.csv", row.names = F)

# Add in new labels by section, which for some D3-associated reason 
# are added on as paired columns 
dmv_graphic_1_renamed = dmv_graphic_1 %>% 
	inner_join(dmv_crosswalk %>% 
						 	rename(placeOverall1_1 = fullcountyname), by="placeOverall1") %>% 
	inner_join(dmv_crosswalk %>% 
						 	rename(placeFederal1_1 = fullcountyname), 
						 by=c("placeFederal1"="placeOverall1")) %>%
	inner_join(dmv_crosswalk %>% 
						 	rename(placeMission1_1 = fullcountyname), 
						 by=c("placeMission1"="placeOverall1")) %>%
	inner_join(dmv_crosswalk %>% 
						 	rename(placeSmallBiz1_1 = fullcountyname), 
						 by=c("placeSmallBiz1"="placeOverall1")) %>%
	inner_join(dmv_crosswalk %>% 
						 	rename(placeNonRes1_1 = fullcountyname), 
						 by=c("placeNonRes1"="placeOverall1")) %>%
	inner_join(dmv_crosswalk %>% 
						 	rename(placeSF1_1 = fullcountyname), 
						 by=c("placeSF1"="placeOverall1")) %>%
	inner_join(dmv_crosswalk %>% 
						 	rename(placeMF1_1 = fullcountyname), 
						 by=c("placeMF1"="placeOverall1")) %>%
	glimpse()

dmv_graphic_1_renamed_select = dmv_graphic_1_renamed %>% 
	select(line, place_geoid, in_DMV, place_pop, poverty_perc, 
				 placeOverall1_1, valueOverall1,
				 placeFederal1_1,	valueFederal1,
				 placeMission1_1,	valueMission1,	
				 placeSmallBiz1_1,valueSmallBiz1,	
				 placeNonRes1_1,	valueNonRes1,	
				 placeSF1_1,	    valueSF1,
				 placeMF1_1,      valueMF1) %>% 
	rename(placeOverall1 = placeOverall1_1, 
				 placeFederal1	= placeFederal1_1,	
				 placeMission1	= placeMission1_1,	
				 placeSmallBiz1  = placeSmallBiz1_1,
				 placeNonRes1	  = placeNonRes1_1,	
				 placeSF1	     = placeSF1_1,	    
				 placeMF1      = placeMF1_1)
glimpse(dmv_graphic_1_renamed_select)

write.csv(dmv_graphic_1_renamed_select, "dmv-graphic1-data-labelfix.csv", row.names = F)


import { Launch, LaunchDetailsQuery, LaunchLinks, Maybe } from './../services/spacexGraphql.service';
import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { LaunchDetailFacadeService } from "../services/launch-detail-facade.service";
import { Observable } from "rxjs";
import { ApolloQueryResult } from "apollo-client";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailFacadeService,
  ) {}

  ngOnInit(): void {
    this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 3,
                imageArrows:false,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            {
                breakpoint: 400,
                preview: false
            }
        ];
  }

  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => new Observable(subs => { this.launchDetailsService.pastLaunchDetailStoreCache(id ).subscribe((res:Maybe<
      { __typename?: "Launch" } & Pick<
        Launch,
        "id" | "mission_name" | "details"
      > & {
          links: Maybe<
            { __typename?: "LaunchLinks" } & Pick<
              LaunchLinks,
              "flickr_images" | "mission_patch"
            >
          >;
        }
    >)=>{
      if(res){
        this.galleryImages = res.links.flickr_images.map<NgxGalleryImage>((s:string)=>{return {big:s,medium:s,small:s} });
      }
      subs.next(res);
    })})),map(o=>o));

  // launchDetails$=this.launchDetailsService.pastLaunchDetailStoreCache("107");

}

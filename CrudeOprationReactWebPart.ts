import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {SPHttpClient} from '@microsoft/sp-http';
import * as strings from 'CrudeOprationReactWebPartStrings';
import CrudeOprationReact from './components/CrudeOprationReact';
import { ICrudeOprationReactProps } from './components/ICrudeOprationReactProps';

export interface ICrudeOprationReactWebPartProps {
  description: string;
}

export default class CrudeOprationReactWebPart extends BaseClientSideWebPart <ICrudeOprationReactWebPartProps> {
  SPHttpClient: SPHttpClient;

  public render(): void {
    const element: React.ReactElement<ICrudeOprationReactProps> = React.createElement(
      CrudeOprationReact,
      {
        description: this.properties.description,
        siteUrl:this.context.pageContext.web.absoluteUrl,
        spHttpClient:this.context.spHttpClient
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

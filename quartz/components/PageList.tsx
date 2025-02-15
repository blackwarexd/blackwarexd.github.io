import { FullSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

// export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
//   return (f1, f2) => {
//     if (f1.dates && f2.dates) {
//       // sort descending
//       return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
//     } else if (f1.dates && !f2.dates) {
//       // prioritize files with dates
//       return -1
//     } else if (!f1.dates && f2.dates) {
//       return 1
//     }

//     // otherwise, sort lexographically by title
//     const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
//     const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
//     return f1Title.localeCompare(f2Title)
//   }
// }

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    const title1 = f1.frontmatter?.title || '';
    const title2 = f2.frontmatter?.title || '';
    
    const num1 = extractLeadingNumber(title1);
    const num2 = extractLeadingNumber(title2);
    
    // Compare the extracted numbers.
    if (num1 !== num2) {
      return num1 - num2;
    }
    
    // Fallback: if numbers are equal, sort alphabetically.
    return title1.localeCompare(title2);
  };
}

/**
 * Extracts the leading number from a title.
 * If the title contains a comma or dash after the number,
 * it returns that number. For example:
 *   "111,2049-NFS" -> 111
 *   "22-SSH"      -> 22
 */
function extractLeadingNumber(title: string): number {
  const match = title.match(/^(\d+)[,-]/);
  if (match) {
    return Number(match[1]);
  }
  // Fallback to a high number so that titles without a leading number come last.
  return Number.MAX_SAFE_INTEGER;
}


type Props = {
  limit?: number
  sort?: SortFn
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort }: Props) => {
  const sorter = sort ?? byDateAndAlphabetical(cfg)
  let list = allFiles.sort(sorter)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul class="section-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title
        const tags = page.frontmatter?.tags ?? []

        return (
          <li class="section-li">
            <div class="section">
              <div>
                {page.dates && (
                  <p class="meta">
                    <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                  </p>
                )}
              </div>
              <div class="desc">
                <h3>
                  <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                    {title}
                  </a>
                </h3>
              </div>
              <ul class="tags">
                {tags.map((tag) => (
                  <li>
                    <a
                      class="internal tag-link"
                      href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

PageList.css = `
.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
